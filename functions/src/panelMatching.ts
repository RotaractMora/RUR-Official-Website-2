import {db} from "./firebaseSetup";
import {logger} from "firebase-functions";
import {onSchedule} from "firebase-functions/v2/scheduler";
import {Timestamp, FieldValue} from "firebase-admin/firestore";

const REGION = "asia-southeast1";

/**
 * Pub/Sub scheduled function to match interviewers to panels
 * Runs daily at 6 PM for next day's panels
 */
export const matchPanels = onSchedule({
  schedule: "0 18 * * *",
  timeZone: "Asia/Colombo",
  region: REGION,
}, async () => {
  try {
    logger.info("Starting panel matching process...");

    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    tomorrow.setHours(0, 0, 0, 0);
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);

    // Fetch draft panels for tomorrow
    const panelsSnapshot = await db.collection("panels")
      .where("date", ">=", Timestamp.fromDate(tomorrow))
      .where("date", "<", Timestamp.fromDate(dayAfter))
      .where("status", "==", "draft")
      .get();

    if (panelsSnapshot.empty) {
      logger.info("No draft panels found for matching");
      return;
    }

    const panels = panelsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Array<Record<string, unknown> & {id: string}>;

    // Fetch active interviewers
    const interviewersSnapshot = await db.collection("interviewers")
      .where("status", "==", "active")
      .get();

    if (interviewersSnapshot.empty) {
      logger.warn("No active interviewers found");
      return;
    }

    const interviewers = interviewersSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Array<Record<string, unknown> & {id: string}>;

    const batch = db.batch();
    let panelsMatched = 0;

    // Match each panel with available interviewers
    for (const panel of panels) {
      const requiredInterviewers = 2;
      const assignedInterviewers = [];

      for (let i = 0; i < Math.min(requiredInterviewers, interviewers.length); i++) {
        const interviewer = interviewers[i];
        assignedInterviewers.push({
          interviewerId: interviewer.id,
          name: interviewer.name as string,
          companyName: interviewer.companyName as string,
          role: i === 0 ? "lead" : "member",
        });
      }

      if (assignedInterviewers.length > 0) {
        const panelRef = db.collection("panels").doc(panel.id);
        batch.update(panelRef, {
          interviewers: assignedInterviewers,
          status: "active",
          updatedAt: FieldValue.serverTimestamp(),
        });

        for (const assigned of assignedInterviewers) {
          const interviewerRef = db.collection("interviewers")
            .doc(assigned.interviewerId);
          batch.update(interviewerRef, {
            assignedPanels: FieldValue.arrayUnion(panel.id),
          });
        }

        panelsMatched++;
        logger.info(`Matched panel ${panel.id}`);
      }
    }

    await batch.commit();
    logger.info(`Panel matching completed: ${panelsMatched} panels matched`);
  } catch (error) {
    logger.error("Error in matchPanels:", error);
    throw error;
  }
});
