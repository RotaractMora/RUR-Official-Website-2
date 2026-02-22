import { Timestamp } from "firebase/firestore";

export type SponsorLevel = "Gold" | "Silver" | "Bronze" | "Partner" | string;

export interface ISponsor {
    id?: string;
    name: string;
    partnership: string;
    level: SponsorLevel;
    order: number;
    imgURL?: string;
    timestamp?: Timestamp;
    isVisibleToPublic: boolean;
  }