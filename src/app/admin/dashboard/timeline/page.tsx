"use client"
import React, { useEffect, useState } from "react";
import { AdminDashboardLayout } from "../../admin-dashboard-layout";
import { getTimeLineEvents } from "@/services/timeline.service";
import { ITimelineData } from "@/interfaces/ITimeline";
import TimelineAddUpdateModal from "@/components/blocks/modals/timeline-add-update-modal";
import TimelineDeleteModal from "@/components/blocks/modals/timeline-delete-modal";
import Image from "next/image";
import Swal from 'sweetalert2';

export default function ManageTimeline() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [eventToDelete, setEventToDelete] = useState<ITimelineData | null>(null);
  const [timelineEvents, setTimelineEvents] = useState<ITimelineData[]>([]);
  const [refresh, setRefresh] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Separate function to ensure alert is always shown
  const showAlert = (title: string, message: string, icon: 'error' | 'success' | 'warning' | 'info') => {
    return new Promise((resolve) => {
      Swal.fire({
        title,
        text: message,
        icon,
        confirmButtonText: 'OK',
        confirmButtonColor: '#3085d6',
        allowOutsideClick: false,
        allowEscapeKey: false,
        customClass: {
          container: 'dark:bg-gray-800',
          popup: 'dark:bg-gray-700 dark:text-white',
          title: 'dark:text-white',
        }
      }).then(resolve);
    });
  };

  // Network status check function
  const checkNetworkStatus = () => {
    return new Promise((resolve, reject) => {
      if (!navigator.onLine) {
        reject(new Error('No internet connection'));
        return;
      }

      // Additional network check using fetch
      fetch('https://www.google.com/favicon.ico', {
        mode: 'no-cors',
        cache: 'no-store'
      })
        .then(() => resolve(true))
        .catch(() => reject(new Error('Network error')));
    });
  };

  useEffect(() => {
    let isMounted = true;

    const fetchTimelineEvents = async () => {
      if (!isMounted) return;
      setIsLoading(true);

      try {
        // First check network status
        await checkNetworkStatus();

        const timeoutDuration = 15000; // Increased to 15 seconds
        const controller = new AbortController();
        const signal = controller.signal;

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            controller.abort();
            reject(new Error('Request timed out'));
          }, timeoutDuration);
        });

        const fetchPromise = getTimeLineEvents(100);

        const data = await Promise.race([fetchPromise, timeoutPromise]);

        if (!isMounted) return;
        setTimelineEvents(data as ITimelineData[]);

      } catch (error: any) {
        if (!isMounted) return;

        let errorMessage = "Failed to fetch timeline events";
        let errorTitle = "Error";
        
        // Enhanced error handling
        if (!navigator.onLine || error.message === 'No internet connection') {
          errorMessage = "No internet connection. Please check your network and try again.";
          errorTitle = "Connection Error";
        } else if (error.name === 'AbortError' || error.message === 'Request timed out') {
          errorMessage = "Request timed out. Please try again.";
          errorTitle = "Timeout Error";
        } else if (error instanceof TypeError && error.message === "Failed to fetch") {
          errorMessage = "Network error. Please check your connection and try again.";
          errorTitle = "Network Error";
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        // Ensure alert is shown even in case of network issues
        await showAlert(errorTitle, errorMessage, 'error');
        console.error("Error fetching timeline events:", error);

      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    // Network status event handlers
    const handleOnline = async () => {
      if (isMounted) {
        await showAlert('Connected', 'Internet connection restored', 'success');
        fetchTimelineEvents();
      }
    };

    const handleOffline = async () => {
      if (isMounted) {
        await showAlert('Disconnected', 'No internet connection', 'warning');
      }
    };

    // Initial fetch
    fetchTimelineEvents();

    // Add event listeners
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Cleanup
    return () => {
      isMounted = false;
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
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

        {isLoading ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              Loading...
            </h3>
          </div>
        ) : timelineEvents.length === 0 ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
              No Timeline Events
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Timeline will be updated soon
            </p>
          </div>
        ) : (
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
                {timelineEvents.map((event) => (
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
                        <span className="text-gray-500">
                          {event.isBtnDisabled ? '(Disabled)' : '(Enabled)'}
                        </span>
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
                ))}
              </tbody>
            </table>
          </div>
        )}

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