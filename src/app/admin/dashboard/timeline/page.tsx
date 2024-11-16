"use client"
import { AdminDashboardLayout } from "../../admin-dashboard-layout";
import { getTimeLineEvents } from "@/services/timeline.service";
import { ITimelineData } from "@/interfaces/ITimeline";
import TimelineAddUpdateModal from "@/components/blocks/modals/timeline-add-update-modal";
import TimelineDeleteModal from "@/components/blocks/modals/timeline-delete-modal";
import { useEffect, useState } from "react";
import Image from "next/image";

export default function ManageTimeline() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<ITimelineData | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<ITimelineData[]>([]);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    getTimeLineEvents(100) // Fetch up to 100 events
      .then((data) => {
        setTimelineEvents(data);
      })
      .catch((error) => {
        console.error("Error fetching timeline events:", error);
      });
  }, [refresh]);

  const refreshData = () => {
    setRefresh(!refresh);
  };

  const handleDeleteClick = (event: ITimelineData) => {
    setEventToDelete(event);
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setEventToDelete(null);
  };

  return (
    <AdminDashboardLayout>
      <div className="dashboard-content p-6 w-4/5 mx-auto rounded-lg">
        <h2 className="text-4xl font-extrabold dark:text-white">Timeline Events</h2>
        <p className="my-4 text-lg dark:text-gray-300">Manage timeline events here</p>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">Title</th>
                <th scope="col" className="px-6 py-3">Image</th>
                <th scope="col" className="px-6 py-3">Event Date</th>
                <th scope="col" className="px-6 py-3">Order</th>
                <th scope="col" className="px-6 py-3">Button</th>
                <th scope="col" className="px-6 py-3">Action</th>
              </tr>
            </thead>
            <tbody>
              {timelineEvents.length > 0 ? (
                timelineEvents.map((event) => (
                  <tr
                    key={event.id}
                    className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                  >
                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {event.title}
                    </th>
                    <td className="px-6 py-4">
                      <Image
                        src={event.imgURL}
                        alt={event.title}
                        width={40}
                        height={40}
                        className="rounded-lg dark:bg-black bg-white"
                      />
                    </td>
                    <td className="px-6 py-4">
                      {event.eventDate.toDate().toLocaleString()}
                    </td>
                    <td className="px-6 py-4">
                      {event.order}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col text-xs">
                        <span>{event.btnText}</span>
                        <span className="text-gray-500">{event.isBtnDisabled ? '(Disabled)' : '(Enabled)'}</span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleDeleteClick(event)}
                        className="text-red-500 hover:text-red-700 transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-4">
                    No timeline events found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        <div className="mt-3">
          <TimelineAddUpdateModal onAddEvent={refreshData} />
        </div>

        {isDeleteModalOpen && eventToDelete && (
          <TimelineDeleteModal
            event={eventToDelete}
            onClose={closeDeleteModal}
            onDelete={refreshData}
          />
        )}
      </div>
    </AdminDashboardLayout>
  );
}