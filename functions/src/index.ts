import { initializeApp } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import {
  onDocumentCreated,
  onDocumentUpdated,
  onDocumentDeleted,
} from "firebase-functions/v2/firestore";
import { logger } from "firebase-functions";

initializeApp();
const db = getFirestore();

// Path for the aggregated document
const AGGREGATED_DOC_PATH = "metadata/aggregatedInfo";

// Aggregates data from /info-sponsors and /info-timeline into a single document
const aggregateData = async () => {
  try {
    const aggregatedData: {
      "info-sponsors": Record<string, unknown>;
      "info-timeline": Record<string, unknown>;
    } = { "info-sponsors": {}, "info-timeline": {} };

    // Aggregate data from info-sponsors
    const sponsorsSnapshot = await db.collection("info-sponsors").get();
    sponsorsSnapshot.forEach((doc) => {
      aggregatedData["info-sponsors"][doc.id] = doc.data();
    });

    // Aggregate data from info-timeline
    const timelineSnapshot = await db.collection("info-timeline").get();
    timelineSnapshot.forEach((doc) => {
      aggregatedData["info-timeline"][doc.id] = doc.data();
    });

    // Save the aggregated data to the Firestore document
    await db.doc(AGGREGATED_DOC_PATH).set(aggregatedData);
    logger.info("Successfully aggregated data into:", AGGREGATED_DOC_PATH);
  } catch (error) {
    logger.error("Error aggregating data:", error);
  }
};

// Helper to create triggers for a given collection
const createTriggers = (collectionPath: string) => {
  return {
    onCreate: onDocumentCreated(`${collectionPath}/{docId}`, async (event) => {
      logger.info(`Document created in ${collectionPath}:`, event.params.docId);
      await aggregateData();
    }),
    onUpdate: onDocumentUpdated(`${collectionPath}/{docId}`, async (event) => {
      logger.info(`Document updated in ${collectionPath}:`, event.params.docId);
      await aggregateData();
    }),
    onDelete: onDocumentDeleted(`${collectionPath}/{docId}`, async (event) => {
      logger.info(`Document deleted in ${collectionPath}:`, event.params.docId);
      await aggregateData();
    }),
  };
};

// Export triggers for /info-sponsors
export const aggregateInfoSponsors = createTriggers("info-sponsors");

// Export triggers for /info-timeline
export const aggregateInfoTimeline = createTriggers("info-timeline");