import {db} from "./firebaseSetup";
import {logger} from "firebase-functions";
import {onSchedule} from "firebase-functions/v2/scheduler";
import {Timestamp, FieldValue} from "firebase-admin/firestore";

const REGION = "asia-southeast1";

/**
 * Pub/Sub scheduled function to generate live interview panels
 * Runs daily at 6 AM to create panel sessions for the day
 */
export const generateLiveInterviewPanels = onSchedule({
  schedule: "0 6 * * *",
  timeZone: "Asia/Colombo",
  region: REGION,
}, async () => {
  try {
    logger.info("Starting live interview panel generation...");

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    // Fetch today's scheduled interviews
    const interviewsSnapshot = await db.collection("interviews")
      .where("date", ">=", Timestamp.fromDate(today))
      .where("date", "<", Timestamp.fromDate(tomorrow))
      .where("status", "==", "scheduled")
      .get();

    if (interviewsSnapshot.empty) {
      logger.info("No scheduled interviews for today");
      return;
    }

    const interviews = interviewsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Array<Record<string, unknown> & {id: string}>;

    // Fetch active panels for today
    const panelsSnapshot = await db.collection("panels")
      .where("date", ">=", Timestamp.fromDate(today))
      .where("date", "<", Timestamp.fromDate(tomorrow))
      .where("status", "==", "active")
      .get();

    if (panelsSnapshot.empty) {
      logger.warn("No active panels found for today");
      return;
    }

    const panels = panelsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Array<Record<string, unknown> & {id: string}>;

    const batch = db.batch();
    let livePanelsCreated = 0;

    // Create live panel for each active panel
    for (const panel of panels) {
      const panelInterviews = interviews
        .filter((interview) => {
          const intStartTime = interview.startTime as string;
          const pStartTime = panel.startTime as string;
          const pEndTime = panel.endTime as string;
          return intStartTime >= pStartTime && intStartTime <= pEndTime;
        })
        .slice(0, panel.maxInterviews as number);

      if (panelInterviews.length === 0) {
        continue;
      }

      const livePanelRef = db.collection("live-panels").doc();
      const interviewQueue = panelInterviews
        .sort((a, b) => {
          const aTime = a.startTime as string;
          const bTime = b.startTime as string;
          return aTime.localeCompare(bTime);
        })
        .map((i) => i.id);

      batch.set(livePanelRef, {
        sessionId: `PANEL-${panel.id}-${Date.now()}`,
        panelId: panel.id,
        panelName: panel.panelName as string,
        currentInterviewId: null,
        startedAt: FieldValue.serverTimestamp(),
        status: "waiting",
        interviewQueue: interviewQueue,
        completedInterviews: [],
        location: panel.location as string,
        createdAt: FieldValue.serverTimestamp(),
      });

      livePanelsCreated++;
      logger.info(`Created live panel: ${panel.panelName}`);
    }

    await batch.commit();
    logger.info(`Live panel generation completed: ${livePanelsCreated} panels`);
  } catch (error) {
    logger.error("Error in generateLiveInterviewPanels:", error);
    throw error;
  }
});
