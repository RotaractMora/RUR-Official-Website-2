import { IContact } from "@/interfaces/IContacts";
import { collection, DocumentData, getDocs, getFirestore, Query, query } from "firebase/firestore";
import { app } from "./firebaseConfig";

export const getReachUs = async ():Promise<IContact[]> => {
    const db = getFirestore(app);
    const reachUsCollection = collection(db, "info-reach");
    const reachUsQuery:Query<DocumentData,DocumentData>  = query(reachUsCollection);
    const reachUsSnapshot = await getDocs(reachUsQuery);
    const reachUsList = reachUsSnapshot.docs.map(doc => ({ id: doc.id as string, ...doc.data() })) as IContact[];
    return reachUsList;
}
