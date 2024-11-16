import { getFirestore, collection, getDocs, limit, where, query , DocumentData, QueryDocumentSnapshot, Query, startAfter, orderBy, addDoc, DocumentReference, deleteDoc, doc } from "firebase/firestore";
import {app} from './firebaseConfig';
import { ISponsor ,SponsorLevel } from "@/interfaces/ISponsors";

export const getSponsors = async (level:SponsorLevel, lim:number = 10 ,lastDoc?:QueryDocumentSnapshot<DocumentData>):Promise<ISponsor[]> => {
    const db = getFirestore(app);
    const sponsorsCollection = collection(db, "info-sponsors");
    let sponsorsQuery:Query<DocumentData,DocumentData>;
    if(lastDoc){
        if(level === "All"){
            sponsorsQuery = query(sponsorsCollection, limit(lim), orderBy("timestamp"), startAfter(lastDoc));
        }
        else{
            sponsorsQuery = query(sponsorsCollection, where("level", "==", level), limit(lim), orderBy("timestamp"), startAfter(lastDoc));
        }
    }
    else{
        if(level === "All"){
            sponsorsQuery = query(sponsorsCollection, limit(lim), orderBy("timestamp"));
        }
        else{
            sponsorsQuery = query(sponsorsCollection, where("level", "==", level), limit(lim) , orderBy("timestamp"));
        }
    }
    const sponsorsSnapshot = await getDocs(sponsorsQuery);
    const sponsorsList = sponsorsSnapshot.docs.map(doc => ({ id: doc.id as string, ...doc.data() })) as ISponsor[];
    return sponsorsList;
}

export const addSponsor = async (sponsor:ISponsor):Promise<DocumentReference<DocumentData, DocumentData>>=> {
    const db = getFirestore(app);
    const sponsorsCollection = collection(db, "info-sponsors");
    const timestamp = new Date();
    const res = await addDoc(sponsorsCollection,{...sponsor,timestamp});
    return res;    
}

export const deleteSponsor = async (docId:string):Promise<void> => {
    const db = getFirestore(app);
    const sponsorsCollection = collection(db, "info-sponsors");
    const docRef = doc(sponsorsCollection, docId);
    return await deleteDoc(docRef);
}

