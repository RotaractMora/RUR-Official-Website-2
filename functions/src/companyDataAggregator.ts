import { db } from './firebaseSetup';
import { FieldValue } from 'firebase-admin/firestore';
import {
  onDocumentCreated,
  onDocumentUpdated,
  onDocumentDeleted,
} from 'firebase-functions/v2/firestore';
import { https, logger } from 'firebase-functions';

const REGION = 'asia-southeast1';

const AGGREGATED_COMPANIES_DOC_PATH = 'metadata/agregatedCompanies';
const COMPANIES_COLLECTION_PATH = 'campaigns/rur-25/companies';

// Fields to be aggregated
const SELECTED_FIELDS = [
  'companyId',
  'name',
  'description',
  'logoUrl',
  'preferredFields',
  'qualitiesToLook',
  'dataConfirmed',
  'website',
  'availableJobTypes',
];

const filterSelectedFields = (data: Record<string, any>): Record<string, any> =>
  Object.fromEntries(Object.entries(data).filter(([key]) => SELECTED_FIELDS.includes(key)));

export const manualAggregateCompanies = https.onRequest(
  {
    region: REGION,
  },
  async (req, res) => {
    try {
      const aggregatedCompanies: Record<string, any> = {};
      const companiesSnapshot = await db.collection(COMPANIES_COLLECTION_PATH).get();

      companiesSnapshot.forEach((doc) => {
        // Include only if dataConfirmed is true
        if (doc.data().dataConfirmed) {
          aggregatedCompanies[doc.id] = filterSelectedFields(doc.data());
        }
      });

      await db.doc(AGGREGATED_COMPANIES_DOC_PATH).set({ companies: aggregatedCompanies });

      logger.info('Manual aggregation completed:', AGGREGATED_COMPANIES_DOC_PATH);
      res.status(200).send({ message: 'Manual aggregation completed.' });
    } catch (error) {
      logger.error('Error during manual aggregation:', error);
      res.status(500).send({ error: 'Internal Server Error' });
    }
  },
);

export const incrementalAggregateCompanies = {
  onCreate: onDocumentCreated(
    {
      document: COMPANIES_COLLECTION_PATH + '/{docId}',
      region: REGION,
    },
    async (event) => {
      try {
        const newData = event.data?.data();
        if (!newData?.dataConfirmed) return;

        const newDoc = filterSelectedFields(newData);
        const docId = event.params.docId;

        // Update the aggregated document with the new data
        await db.doc(AGGREGATED_COMPANIES_DOC_PATH).update({
          [`companies.${docId}`]: newDoc,
        });

        logger.info(`Incrementally added document: ${docId}`);
      } catch (error) {
        logger.error('Error during onCreate incremental update:', error);
      }
    },
  ),

  onUpdate: onDocumentUpdated(
    {
      document: COMPANIES_COLLECTION_PATH + '/{docId}',
      region: REGION,
    },
    async (event) => {
      try {
        const updatedData = event.data?.after.data();
        if (!updatedData?.dataConfirmed) return;

        const updatedDoc = filterSelectedFields(updatedData);
        const docId = event.params.docId;

        // Update the aggregated document with the updated data
        await db.doc(AGGREGATED_COMPANIES_DOC_PATH).update({
          [`companies.${docId}`]: updatedDoc,
        });

        logger.info(`Incrementally updated document: ${docId}`);
      } catch (error) {
        logger.error('Error during onUpdate incremental update:', error);
      }
    },
  ),

  onDelete: onDocumentDeleted(
    {
      document: COMPANIES_COLLECTION_PATH + '/{docId}',
      region: REGION,
    },
    async (event) => {
      try {
        const docId = event.params.docId;

        // Remove the deleted document from the aggregated document
        await db.doc(AGGREGATED_COMPANIES_DOC_PATH).update({
          [`companies.${docId}`]: FieldValue.delete(),
        });

        logger.info(`Incrementally deleted document: ${docId}`);
      } catch (error) {
        logger.error('Error during onDelete incremental update:', error);
      }
    },
  ),
};
