import { getFirestore, collection, getDocs, limit, where, query, DocumentData, QueryDocumentSnapshot, Query, startAfter, orderBy, addDoc, DocumentReference, deleteDoc, getDoc, doc } from "firebase/firestore";
import {app} from './firebaseConfig';
import { ITimelineData } from "@/interfaces/ITimeline";

export const getTimeLineEvents = async (lim:number = 10 ,lastDoc?:QueryDocumentSnapshot<DocumentData>):Promise<ITimelineData[]> => {
    const db = getFirestore(app);
    const timeLineEventsCollection = collection(db, "info-timeline");
    let timeLineEventsQuery:Query<DocumentData,DocumentData>;
    if(lastDoc){
        timeLineEventsQuery = query(timeLineEventsCollection, limit(lim), orderBy("order"), startAfter(lastDoc));
    }
    else{
        timeLineEventsQuery = query(timeLineEventsCollection, limit(lim) , orderBy("order"));
    }
    const timeLineEventsSnapshot = await getDocs(timeLineEventsQuery);
    const timeLineEventsList = timeLineEventsSnapshot.docs.map(doc => ({ id: doc.id as string, ...doc.data() })) as ITimelineData[];
    return timeLineEventsList;
}

export const addTimeLineEvent = async (timeline:ITimelineData):Promise<DocumentReference<DocumentData, DocumentData>>=> {
    const db = getFirestore(app);
    const timeLineEventsCollection = collection(db, "info-timeline");
    const res = await addDoc(timeLineEventsCollection,{...timeline});
    return res;    
}

export const deleteTimeLineEvent = async (docId:string):Promise<void> => {
    const db = getFirestore(app);
    const timeLineEventsCollection = collection(db, "info-timeline");
    const docRef = doc(timeLineEventsCollection, docId);
    return await deleteDoc(docRef);
}

