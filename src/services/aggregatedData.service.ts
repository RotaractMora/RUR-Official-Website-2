import { getFirestore, DocumentData , doc, getDoc } from "firebase/firestore";
import {app} from './firebaseConfig';
import { ITimelineData } from "@/interfaces/ITimeline";
import { ISponsor } from "@/interfaces/ISponsors";


const AGGREGATED_DOC_PATH = "metadata/aggregatedInfo";

const getAggregatedDoc = async ():Promise<DocumentData> => {
    const db = getFirestore(app);
    const docRef = doc(db, AGGREGATED_DOC_PATH);
    const docSnap = await getDoc(docRef);
    return docSnap
}

export const getDataFromAggregatedDoc = async ():Promise<{timelineList:ITimelineData[],sponsorList:ISponsor[]}> => {
    const aggregatedDoc = await getAggregatedDoc();
    console.log("Aggregated Doc",aggregatedDoc);
    console.log("Aggregated Doc Data",aggregatedDoc.data());
    const data = aggregatedDoc.data();

    if(!data){
        return {timelineList:[],sponsorList:[]};
    }

    let timelineList: ITimelineData[] = [];
    let sponsorList: ISponsor[] = [];

    try {
        if (data["info-timeline"]) {
            timelineList = Object.keys(data["info-timeline"])
            .map(key => ({ id: key, ...data["info-timeline"][key] })) as ITimelineData[];
        
            timelineList.sort((a, b) => a.order - b.order); 
    
            }
    } catch (error) {
        console.error("Error processing timeline data:", error);
    }

    try {
        if (data["info-sponsors"]) {
            sponsorList = Object.keys(data["info-sponsors"]).map(key => ({ id: key, ...data["info-sponsors"][key] })) as ISponsor[];
        }
    } catch (error) {
        console.error("Error processing sponsor data:", error);
    }

    return {timelineList,sponsorList};
}