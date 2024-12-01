import {db} from "./firebaseSetup";
import {
  onDocumentCreated,
  onDocumentUpdated,
  onDocumentDeleted,
} from "firebase-functions/v2/firestore";
import {logger} from "firebase-functions";

const REGION = "asia-southeast1";

// Path for the aggregated document
const AGGREGATED_DOC_PATH = "metadata/aggregatedInfo";

// Aggregates data from /info-sponsors and /info-timeline into a single document
const aggregateData = async () => {
  try {
    const aggregatedData: {
      "info-sponsors": Record<string, unknown>;
      "info-timeline": Record<string, unknown>;
    } = {"info-sponsors": {}, "info-timeline": {}};

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
export const createInfoTriggers = (collectionPath: string) => {
  return {
    onCreate: onDocumentCreated({document: `${collectionPath}/{docId}`, region: REGION},
      async (event) => {
        logger.info(`Document created in ${collectionPath}:`, event.params.docId);
        await aggregateData();
      }),
    onUpdate: onDocumentUpdated({document: `${collectionPath}/{docId}`, region: REGION},
      async (event) => {
        logger.info(`Document updated in ${collectionPath}:`, event.params.docId);
        await aggregateData();
      }),
    onDelete: onDocumentDeleted({document: `${collectionPath}/{docId}`, region: REGION},
      async (event) => {
        logger.info(`Document deleted in ${collectionPath}:`, event.params.docId);
        await aggregateData();
      }),
  };
};
