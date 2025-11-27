import {db} from "./firebaseSetup";
import {logger} from "firebase-functions";
import {onSchedule} from "firebase-functions/v2/scheduler";
import {FieldValue} from "firebase-admin/firestore";

const REGION = "asia-southeast1";

/**
 * Pub/Sub scheduled function to match students with interview slots
 * Runs daily at midnight to process pending preferences
 */
export const matchInterviews = onSchedule({
  schedule: "0 0 * * *",
  timeZone: "Asia/Colombo",
  region: REGION,
}, async () => {
  try {
    logger.info("Starting interview matching process...");

    // Fetch pending student preferences
    const preferencesSnapshot = await db.collection("interview-preferences")
      .where("status", "==", "pending")
      .get();

    if (preferencesSnapshot.empty) {
      logger.info("No pending interview preferences found");
      return;
    }

    const preferences = preferencesSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    // Fetch available interview slots
    const slotsSnapshot = await db.collection("interview-slots")
      .where("status", "==", "available")
      .get();

    if (slotsSnapshot.empty) {
      logger.info("No available interview slots found");
      return;
    }

    const slots = slotsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Array<Record<string, unknown> & {
      id: string;
      bookedStudents: number;
      maxStudents: number;
    }>;

    const batch = db.batch();
    let matchCount = 0;

    // Simple matching: assign first available slot to each preference
    for (const preference of preferences) {
      const availableSlot = slots.find((slot) =>
        slot.bookedStudents < slot.maxStudents
      );

      if (availableSlot) {
        // Create interview record
        const interviewRef = db.collection("interviews").doc();
        batch.set(interviewRef, {
          studentId: (preference as Record<string, unknown>).studentId,
          studentName: (preference as Record<string, unknown>).studentName,
          studentEmail: (preference as Record<string, unknown>).studentEmail,
          companyId: availableSlot.companyId,
          companyName: (availableSlot as Record<string, unknown>).companyName,
          slotId: availableSlot.id,
          date: (availableSlot as Record<string, unknown>).date,
          startTime: (availableSlot as Record<string, unknown>).startTime,
          endTime: (availableSlot as Record<string, unknown>).endTime,
          location: (availableSlot as Record<string, unknown>).location,
          meetingLink: (availableSlot as Record<string, unknown>).meetingLink || null,
          interviewType: (availableSlot as Record<string, unknown>).interviewType,
          status: "scheduled",
          createdAt: FieldValue.serverTimestamp(),
          updatedAt: FieldValue.serverTimestamp(),
        });

        // Update slot booked count
        const slotRef = db.collection("interview-slots").doc(availableSlot.id);
        batch.update(slotRef, {
          bookedStudents: FieldValue.increment(1),
        });

        // Update preference status
        const preferenceRef = db.collection("interview-preferences")
          .doc(preference.id);
        batch.update(preferenceRef, {
          status: "matched",
          matchedSlotId: availableSlot.id,
        });

        matchCount++;
        availableSlot.bookedStudents++;
      }
    }

    await batch.commit();
    logger.info(`Interview matching completed: ${matchCount} matches created`);
  } catch (error) {
    logger.error("Error in matchInterviews:", error);
    throw error;
  }
});
