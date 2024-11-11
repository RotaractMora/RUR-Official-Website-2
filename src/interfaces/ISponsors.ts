import { Timestamp } from "firebase/firestore";

export type SponsorLevel = "Gold" | "Silver" | "Bronze" | string;

export interface ISponser {
    id?: string;
    level: SponsorLevel;
    sponsor: string;
    timestamp?: Timestamp;
  }