// Import Firebase Functions and Admin SDK
const logger = require("firebase-functions/logger");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { onDocumentCreated, onDocumentUpdated, onDocumentDeleted } = require("firebase-functions/v2/firestore");

initializeApp();
const db = getFirestore();

// Function to create or update a user document in Firestore
const createUserDocument = async (userId: string, userData: any) => {
  try {
    const userRef = db.collection("users").doc(userId);
    await userRef.set(userData, { merge: true });
    logger.info(`User document created/updated for user ID: ${userId}`);
  } catch (error) {
    logger.error("Error creating/updating user document:", error);
  }
};

module.exports = { createUserDocument }; // Export for use in your front-end

// Path for the aggregated document
const AGGREGATED_DOC_PATH = "metadata/aggregatedInfo";

// Aggregates data from /info-sponsors and /info-timeline into a single document
const aggregateData = async () => {
  try {
    const aggregatedData: {
      "info-sponsors": Record<string, any>;
      "info-timeline": Record<string, any>;
    } = { "info-sponsors": {}, "info-timeline": {} };

    // Aggregate data from info-sponsors
    const sponsorsSnapshot = await db.collection("info-sponsors").get();
    sponsorsSnapshot.forEach((doc: any) => {
      aggregatedData["info-sponsors"][doc.id] = doc.data();
    });

    // Aggregate data from info-timeline
    const timelineSnapshot = await db.collection("info-timeline").get();
    timelineSnapshot.forEach((doc: any) => {
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
    onCreate: onDocumentCreated(`${collectionPath}/{docId}`, async (event: any) => {
      logger.info(`Document created in ${collectionPath}:`, event.params.docId);
      await aggregateData();
    }),
    onUpdate: onDocumentUpdated(`${collectionPath}/{docId}`, async (event: any) => {
      logger.info(`Document updated in ${collectionPath}:`, event.params.docId);
      await aggregateData();
    }),
    onDelete: onDocumentDeleted(`${collectionPath}/{docId}`, async (event: any) => {
      logger.info(`Document deleted in ${collectionPath}:`, event.params.docId);
      await aggregateData();
    }),
  };
};

// Export triggers for /info-sponsors
exports.aggregateInfoSponsors = createTriggers("info-sponsors");

// Export triggers for /info-timeline
exports.aggregateInfoTimeline = createTriggers("info-timeline");
