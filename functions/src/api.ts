import {db} from "./firebaseSetup";
import {logger} from "firebase-functions";
import {onRequest} from "firebase-functions/v2/https";
import {FieldValue} from "firebase-admin/firestore";

const REGION = "asia-southeast1";

/**
 * HTTP API endpoint for interview management operations
 * Provides REST API for interviews, panels, and related operations
 */
export const api = onRequest({
  region: REGION,
  cors: true,
}, async (req, res) => {
  try {
    const {method, path} = req;
    const url = req.url || path || "";

    logger.info(`API Request: ${method} ${url}`);

    // Simple routing based on method and path
    if (method === "GET" && url.includes("/interviews")) {
      // GET /interviews - List interviews
      const {studentId, companyId} = req.query;
      let query = db.collection("interviews") as FirebaseFirestore.Query;

      if (studentId) {
        query = query.where("studentId", "==", studentId);
      }
      if (companyId) {
        query = query.where("companyId", "==", companyId);
      }

      const snapshot = await query.limit(100).get();
      const interviews = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.json({interviews});
    } else if (method === "GET" && url.includes("/panels")) {
      // GET /panels - List panels
      const snapshot = await db.collection("panels").limit(100).get();
      const panels = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      res.json({panels});
    } else if (method === "POST" && url.includes("/interviews")) {
      // POST /interviews - Create interview
      const data = req.body;
      const docRef = await db.collection("interviews").add({
        ...data,
        status: "scheduled",
        createdAt: FieldValue.serverTimestamp(),
        updatedAt: FieldValue.serverTimestamp(),
      });

      res.status(201).json({
        id: docRef.id,
        message: "Interview created successfully",
      });
    } else if (method === "PUT" && url.includes("/interviews/")) {
      // PUT /interviews/:id - Update interview
      const pathParts = url.split("/");
      const interviewId = pathParts[pathParts.indexOf("interviews") + 1];
      const data = req.body;

      await db.collection("interviews").doc(interviewId).update({
        ...data,
        updatedAt: FieldValue.serverTimestamp(),
      });

      res.json({message: "Interview updated successfully"});
    } else if (method === "DELETE" && url.includes("/interviews/")) {
      // DELETE /interviews/:id - Cancel interview
      const pathParts = url.split("/");
      const interviewId = pathParts[pathParts.indexOf("interviews") + 1];

      await db.collection("interviews").doc(interviewId).update({
        status: "cancelled",
        updatedAt: FieldValue.serverTimestamp(),
      });

      res.json({message: "Interview cancelled successfully"});
    } else {
      res.status(404).json({error: "Endpoint not found"});
    }
  } catch (error) {
    logger.error("API Error:", error);
    res.status(500).json({
      error: "Internal server error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
});
