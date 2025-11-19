import { getFirestore, DocumentData, doc, getDoc } from 'firebase/firestore';
import { app } from './firebaseConfig';
import { ITimelineData } from '@/interfaces/ITimeline';
import { ISponsor } from '@/interfaces/ISponsors';
import { IContact } from '@/interfaces/IContacts';

const AGGREGATED_DOC_PATH = 'metadata/aggregatedInfo';

const getAggregatedDoc = async (): Promise<DocumentData> => {
  const db = getFirestore(app);
  const docRef = doc(db, AGGREGATED_DOC_PATH);
  const docSnap = await getDoc(docRef);
  return docSnap;
};

export const getDataFromAggregatedDoc = async (): Promise<{
  timelineList: ITimelineData[];
  sponsorList: ISponsor[];
  reachUsContactList: IContact[];
}> => {
  const aggregatedDoc = await getAggregatedDoc();
  console.log('Aggregated Doc', aggregatedDoc);
  console.log('Aggregated Doc Data', aggregatedDoc.data());
  const data = aggregatedDoc.data();

  if (!data) {
    return { timelineList: [], sponsorList: [], reachUsContactList: [] };
  }

  let timelineList: ITimelineData[] = [];
  let sponsorList: ISponsor[] = [];
  let reachUsContactList: IContact[] = [];

  try {
    if (data['info-timeline']) {
      timelineList = Object.keys(data['info-timeline']).map((key) => ({
        id: key,
        ...data['info-timeline'][key],
      })) as ITimelineData[];

      timelineList.sort((a, b) => a.order - b.order);
    }
  } catch (error) {
    console.error('Error processing timeline data:', error);
  }

  try {
    if (data['info-sponsors']) {
      sponsorList = Object.keys(data['info-sponsors']).map((key) => ({
        id: key,
        ...data['info-sponsors'][key],
      })) as ISponsor[];
    }
  } catch (error) {
    console.error('Error processing sponsor data:', error);
  }

  try {
    if (data['info-reach']) {
      reachUsContactList = Object.keys(data['info-reach']).map((key) => ({
        id: key,
        ...data['info-reach'][key],
      })) as IContact[];
    }
  } catch (error) {
    console.error('Error processing reach us data:', error);
  }

  return { timelineList, sponsorList, reachUsContactList };
};
