import { Timestamp } from "firebase/firestore";

export type SponsorLevel = "Gold" | "Silver" | "Bronze" | string;

export interface ISponsor {
    id?: string;
    name: string;
    level: SponsorLevel;
    imgURL?: string;
    timestamp?: Timestamp;
    isVisibleToPublic: boolean;
  }