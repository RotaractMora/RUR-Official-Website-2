import { IContact } from "@/interfaces/IContacts";
import { addDoc, collection, deleteDoc, doc, DocumentData, DocumentReference, getDocs, getFirestore, Query, query, updateDoc } from "firebase/firestore";
import { app } from "./firebaseConfig";

export const getReachUs = async ():Promise<IContact[]> => {
    const db = getFirestore(app);
    const reachUsCollection = collection(db, "info-reach");
    const reachUsQuery:Query<DocumentData,DocumentData>  = query(reachUsCollection);
    const reachUsSnapshot = await getDocs(reachUsQuery);
    const reachUsList = reachUsSnapshot.docs.map(doc => ({ id: doc.id as string, ...doc.data() })) as IContact[];
    return reachUsList;
}

export const addReachUsContact = async (contact: IContact): Promise<DocumentReference<DocumentData, DocumentData>> => {
    const db = getFirestore(app);
    const reachUsCollection = collection(db, "info-reach");
    const res = await addDoc(reachUsCollection, {...contact});
    return res;
}

export const updateReachUsContact = async (contactId:string, updatedContact:IContact):Promise<void> => {
    try {
        const db = getFirestore(app);
        const contactRef = doc(db, "info-reach", contactId);
        // Update the document with the new data
        await updateDoc(contactRef, { ...updatedContact });
        console.log(`Sponsor with ID ${contactId} has been updated successfully.`);
    } catch (error) {
        console.error(`Failed to update contact with ID ${contactId}:`, error);
        throw error;
    }

}

export const deleteReachUsContact = async (docId:string):Promise<void> => {
    const db = getFirestore(app);
    const reachUsCollection = collection(db, "info-reach");
    const docRef = doc(reachUsCollection, docId);
    return await deleteDoc(docRef);
}

