import {createInfoTriggers} from "./infoAggregator";
import {
  incrementalAggregateCompanies,
  manualAggregateCompanies,
} from "./companyDataAggregator";
import {matchInterviews} from "./interviewMatching";
import {generateLiveInterviewPanels} from "./panelGeneration";
import {matchPanels} from "./panelMatching";
import {api} from "./api";

// Exporting triggers for /info-sponsors and /info-timeline collections
const sponsorsTriggers = createInfoTriggers("info-sponsors");
const timelineTriggers = createInfoTriggers("info-timeline");
const reachUsTriggers = createInfoTriggers("info-reach");

export const infoSponsorsOnCreate = sponsorsTriggers.onCreate;
export const infoSponsorsOnUpdate = sponsorsTriggers.onUpdate;
export const infoSponsorsOnDelete = sponsorsTriggers.onDelete;

export const infoTimelineOnCreate = timelineTriggers.onCreate;
export const infoTimelineOnUpdate = timelineTriggers.onUpdate;
export const infoTimelineOnDelete = timelineTriggers.onDelete;

export const infoReachUsOnCreate = reachUsTriggers.onCreate;
export const infoReachUsOnUpdate = reachUsTriggers.onUpdate;
export const infoReachUsOnDelete = reachUsTriggers.onDelete;

// Exporting Firestore triggers for incremental company aggregation
export const companyOnCreate = incrementalAggregateCompanies.onCreate;
export const companyOnUpdate = incrementalAggregateCompanies.onUpdate;
export const companyOnDelete = incrementalAggregateCompanies.onDelete;

// Exporting HTTP function for manual aggregation
export const aggregateCompaniesManually = manualAggregateCompanies;

// Exporting interview platform functions
export {matchInterviews, generateLiveInterviewPanels, matchPanels, api};
