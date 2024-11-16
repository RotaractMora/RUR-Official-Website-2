// Import Firebase Functions and Admin SDK
const { logger } = require("firebase-functions");
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
const db = getFirestore();

// Path for the aggregated document
const AGGREGATED_DOC_PATH = "metadata/aggregatedInfo";


//Aggregates data from /info-sponsors and /info-timeline into a single document 
const aggregateData = async () => {
  try {
    const aggregatedData: { "info-sponsors": { [key: string]: any }, "info-timeline": { [key: string]: any } } = { "info-sponsors": {}, "info-timeline": {} };

    // Aggregate data from info-sponsors
    const sponsorsSnapshot = await db.collection("info-sponsors").get();
    aggregatedData["info-sponsors"] = {};
    sponsorsSnapshot.forEach((doc: any) => {
      aggregatedData["info-sponsors"][doc.id] = doc.data();
    });

    // Aggregate data from info-timeline
    const timelineSnapshot = await db.collection("info-timeline").get();
    aggregatedData["info-timeline"] = {};
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

/**
 * Triggered whenever a document is created, updated, or deleted in the monitored collections.
 */
exports.aggregateInfoSponsors = {
  onCreate: require("firebase-functions/v2/firestore").onDocumentCreated(
    "/info-sponsors/{docId}",
    async (event: any) => {
      logger.info("Document created in /info-sponsors:", event.params.docId);
      await aggregateData();
    }
  ),
  onUpdate: require("firebase-functions/v2/firestore").onDocumentUpdated(
    "/info-sponsors/{docId}",
    async (event: any) => {
      logger.info("Document updated in /info-sponsors:", event.params.docId);
      await aggregateData();
    }
  ),
  onDelete: require("firebase-functions/v2/firestore").onDocumentDeleted(
    "/info-sponsors/{docId}",
    async (event: any) => {
      logger.info("Document deleted in /info-sponsors:", event.params.docId);
      await aggregateData();
    }
  ),
};

exports.aggregateInfoTimeline = {
  onCreate: require("firebase-functions/v2/firestore").onDocumentCreated(
    "/info-timeline/{docId}",
    async (event: any) => {
      logger.info("Document created in /info-timeline:", event.params.docId);
      await aggregateData();
    }
  ),
  onUpdate: require("firebase-functions/v2/firestore").onDocumentUpdated(
    "/info-timeline/{docId}",
    async (event: any) => {
      logger.info("Document updated in /info-timeline:", event.params.docId);
      await aggregateData();
    }
  ),
  onDelete: require("firebase-functions/v2/firestore").onDocumentDeleted(
    "/info-timeline/{docId}",
    async (event: any) => {
      logger.info("Document deleted in /info-timeline:", event.params.docId);
      await aggregateData();
    }
  ),
};
