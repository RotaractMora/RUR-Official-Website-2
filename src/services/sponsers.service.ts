import { getFirestore, collection, getDocs, limit, where, query, startAt, DocumentData, QueryDocumentSnapshot, Query, startAfter, orderBy, addDoc, DocumentReference, deleteDoc, getDoc, doc } from "firebase/firestore";
import {app} from './firebaseConfig';
import { ISponser ,SponsorLevel } from "@/interfaces/ISponsors";

export const getSponsers = async (level:SponsorLevel, lim:number = 10 ,lastDoc?:QueryDocumentSnapshot<DocumentData>):Promise<ISponser[]> => {
    const db = getFirestore(app);
    const sponsersCollection = collection(db, "info-sponsors");
    let sponsersQuery:Query<DocumentData,DocumentData>;
    if(lastDoc){
        sponsersQuery = query(sponsersCollection, where("level", "==", level), limit(lim), orderBy("timestamp"), startAfter(lastDoc));
    }
    else{
        sponsersQuery = query(sponsersCollection, where("level", "==", level), limit(lim) , orderBy("timestamp"));
    }
    const sponsersSnapshot = await getDocs(sponsersQuery);
    const sponsersList = sponsersSnapshot.docs.map(doc => ({ id: doc.id as string, ...doc.data() })) as ISponser[];
    return sponsersList;
}

export const addSponser = async (sponsor:ISponser):Promise<DocumentReference<DocumentData, DocumentData>>=> {
    const db = getFirestore(app);
    const sponsersCollection = collection(db, "info-sponsors");
    const timestamp = new Date();
    const res = await addDoc(sponsersCollection,{...sponsor,timestamp});
    return res;    
}

export const deleteSponser = async (docId:string):Promise<void> => {
    const db = getFirestore(app);
    const sponsersCollection = collection(db, "info-sponsors");
    const docRef = doc(sponsersCollection, docId);
    return await deleteDoc(docRef);
}

