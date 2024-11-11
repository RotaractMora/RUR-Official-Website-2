import { Timestamp } from "firebase/firestore";

export interface ITimelineData {
    id?: string;
    title: string;
    description: string;
    imgURL: string;
    eventDate: Timestamp;
    btnLink: string;
    btnText: string;
    isBtnDisabled: boolean;
    order: number;
  }