import { AdminDashboardLayout } from "../admin-dashboard-layout"

export default function ManageTimeline() {
  return (
    <AdminDashboardLayout>
    <div className="dashboard-content p-6 container mx-auto rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
      <p className="text-lg">Manage your content here.</p>
    </div>
    </AdminDashboardLayout>
  );
}
