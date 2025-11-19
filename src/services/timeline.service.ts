import {
  getFirestore,
  collection,
  getDocs,
  limit,
  query,
  DocumentData,
  QueryDocumentSnapshot,
  Query,
  startAfter,
  orderBy,
  addDoc,
  DocumentReference,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { app } from './firebaseConfig';
import { ITimelineData } from '@/interfaces/ITimeline';

export const getTimeLineEvents = async (
  lim: number = 10,
  lastDoc?: QueryDocumentSnapshot<DocumentData>,
): Promise<ITimelineData[]> => {
  const db = getFirestore(app);
  const timeLineEventsCollection = collection(db, 'info-timeline');
  let timeLineEventsQuery: Query<DocumentData, DocumentData>;
  if (lastDoc) {
    timeLineEventsQuery = query(
      timeLineEventsCollection,
      limit(lim),
      orderBy('order'),
      startAfter(lastDoc),
    );
  } else {
    timeLineEventsQuery = query(timeLineEventsCollection, limit(lim), orderBy('order'));
  }
  const timeLineEventsSnapshot = await getDocs(timeLineEventsQuery);
  const timeLineEventsList = timeLineEventsSnapshot.docs.map((doc) => ({
    id: doc.id as string,
    ...doc.data(),
  })) as ITimelineData[];
  return timeLineEventsList;
};

export const addTimeLineEvent = async (
  timeline: ITimelineData,
): Promise<DocumentReference<DocumentData, DocumentData>> => {
  const db = getFirestore(app);
  const timeLineEventsCollection = collection(db, 'info-timeline');
  const res = await addDoc(timeLineEventsCollection, { ...timeline });
  return res;
};

export const updateTimeLineEvent = async (
  timelineEventId: string,
  updatedTimelineEvent: ITimelineData,
): Promise<void> => {
  try {
    const db = getFirestore(app);
    const sponsorRef = doc(db, 'info-timeline', timelineEventId);
    // Update the document with the new data
    await updateDoc(sponsorRef, { ...updatedTimelineEvent });
    console.log(`Timeline Event with ID ${timelineEventId} has been updated successfully.`);
  } catch (error) {
    console.error(`Failed to update timeline event with ID ${timelineEventId}:`, error);
    throw error;
  }
};

export const deleteTimeLineEvent = async (docId: string): Promise<void> => {
  const db = getFirestore(app);
  const timeLineEventsCollection = collection(db, 'info-timeline');
  const docRef = doc(timeLineEventsCollection, docId);
  return await deleteDoc(docRef);
};
