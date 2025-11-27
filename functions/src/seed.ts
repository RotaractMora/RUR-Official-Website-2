import * as admin from "firebase-admin";
import {Timestamp} from "firebase-admin/firestore";

// Initialize Firebase Admin
// Note: This script assumes you are authenticated locally via:
// gcloud auth application-default login
// OR you have GOOGLE_APPLICATION_CREDENTIALS set
if (admin.apps.length === 0) {
  admin.initializeApp();
}

const db = admin.firestore();

const seedDatabase = async () => {
  console.log("🌱 Starting database seed...");

  const batch = db.batch();

  // 1. Companies
  const companyRef = db.collection("companies").doc("sample-company");
  batch.set(companyRef, {
    name: "Tech Corp",
    email: "contact@techcorp.com",
    description: "Leading software company",
    website: "https://techcorp.com",
    logoUrl: "https://via.placeholder.com/150",
    status: "active",
    createdAt: Timestamp.now(),
  });

  // 2. Interview Slots
  const slotRef = db.collection("interview-slots").doc("sample-slot");
  batch.set(slotRef, {
    companyId: "sample-company",
    companyName: "Tech Corp",
    date: Timestamp.fromDate(new Date("2025-11-25T00:00:00Z")),
    startTime: "09:00",
    endTime: "09:30",
    location: "Room A",
    meetingLink: "https://meet.google.com/abc-defg-hij",
    interviewType: "physical",
    bookedStudents: 0,
    maxStudents: 1,
    status: "available",
    createdAt: Timestamp.now(),
  });

  // 3. Interview Preferences (Students)
  const prefRef = db.collection("interview-preferences").doc("sample-preference");
  batch.set(prefRef, {
    studentId: "student-123",
    studentName: "John Doe",
    studentEmail: "john@example.com",
    companyId: "sample-company",
    status: "pending",
    createdAt: Timestamp.now(),
  });

  // 4. Interviews (Scheduled)
  const interviewRef = db.collection("interviews").doc("sample-interview");
  batch.set(interviewRef, {
    studentId: "student-456",
    studentName: "Jane Smith",
    studentEmail: "jane@example.com",
    companyId: "sample-company",
    companyName: "Tech Corp",
    slotId: "sample-slot-2",
    date: Timestamp.fromDate(new Date("2025-11-25T00:00:00Z")),
    startTime: "10:00",
    endTime: "10:30",
    location: "Room A",
    interviewType: "physical",
    status: "scheduled",
    createdAt: Timestamp.now(),
  });

  // 5. Panels
  const panelRef = db.collection("panels").doc("sample-panel");
  batch.set(panelRef, {
    panelName: "Software Engineering Panel 1",
    date: Timestamp.fromDate(new Date("2025-11-25T00:00:00Z")),
    startTime: "09:00",
    endTime: "12:00",
    location: "Auditorium",
    maxInterviews: 10,
    status: "draft",
    interviewers: [],
    createdAt: Timestamp.now(),
  });

  // 6. Interviewers
  const interviewerRef = db.collection("interviewers").doc("sample-interviewer");
  batch.set(interviewerRef, {
    name: "Alice Engineer",
    email: "alice@techcorp.com",
    companyName: "Tech Corp",
    role: "Senior Engineer",
    status: "active",
    assignedPanels: [],
    createdAt: Timestamp.now(),
  });

  // 7. Live Panels (Runtime)
  const livePanelRef = db.collection("live-panels").doc("sample-live-panel");
  batch.set(livePanelRef, {
    panelId: "sample-panel",
    panelName: "Software Engineering Panel 1",
    status: "waiting",
    currentInterviewId: null,
    interviewQueue: [],
    completedInterviews: [],
    createdAt: Timestamp.now(),
  });

  // 8. Info Collections (Sponsors, Timeline, Reach Us)
  const sponsorRef = db.collection("info-sponsors").doc("sample-sponsor");
  batch.set(sponsorRef, {
    name: "Gold Sponsor Inc",
    tier: "gold",
    logoUrl: "https://via.placeholder.com/150",
    createdAt: Timestamp.now(),
  });

  const timelineRef = db.collection("info-timeline").doc("sample-event");
  batch.set(timelineRef, {
    title: "Opening Ceremony",
    date: Timestamp.fromDate(new Date("2025-11-20T09:00:00Z")),
    description: "Welcome to RUR 2025",
    createdAt: Timestamp.now(),
  });

  const reachRef = db.collection("info-reach").doc("sample-contact");
  batch.set(reachRef, {
    name: "Support Team",
    email: "support@rur.com",
    phone: "+1234567890",
    createdAt: Timestamp.now(),
  });

  await batch.commit();
  console.log("✅ Database seeded successfully with sample data!");
};

seedDatabase().catch((error) => {
  console.error("❌ Error seeding database:", error);
  process.exit(1);
});
