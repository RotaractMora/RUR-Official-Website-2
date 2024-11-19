// Import Firebase Admin SDK
const { getFirestore } = require("firebase-admin/firestore");
const logger = require("firebase-functions/logger");

const db = getFirestore();

// Function to create or update a user document in Firestore
export const createUserDocument = async (userId: string, userData: any) => {
  try {
    const userRef = db.collection("users").doc(userId);
    await userRef.set(userData, { merge: true });
    logger.info(`User document created/updated for user ID: ${userId}`);
  } catch (error) {
    logger.error("Error creating/updating user document:", error);
  }
};

module.exports = { createUserDocument }; // Export for use in your front-end

