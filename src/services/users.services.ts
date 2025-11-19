// Import Firebase Admin SDK
import { collection, doc, getFirestore, setDoc } from 'firebase/firestore';
import { logger } from 'firebase-functions';

const db = getFirestore();

// Function to create or update a user document in Firestore
export const createUserDocument = async (userId: string, userData: any) => {
  try {
    const userDoc = doc(db, 'users', userId);
    await setDoc(userDoc, userData, { merge: true });
    logger.info(`User document created/updated for user ID: ${userId}`);
  } catch (error) {
    logger.error('Error creating/updating user document:', error);
  }
};
