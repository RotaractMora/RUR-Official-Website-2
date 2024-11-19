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
  const [error, setError] = useState<string | null>(null);

  // Enhanced alert function with custom styling for dark mode
  const showAlert = async (title: string, message: string, icon: 'error' | 'success' | 'warning' | 'info') => {
    return Swal.fire({
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
        htmlContainer: 'dark:text-gray-300',
        confirmButton: 'dark:bg-blue-600 dark:hover:bg-blue-700',
      },
      backdrop: 'rgba(0,0,0,0.4)',
      showClass: {
        popup: 'animate__animated animate__fadeIn'
      },
      hideClass: {
        popup: 'animate__animated animate__fadeOut'
      }
    });
  };

  // Enhanced network status check
  const checkNetworkStatus = async () => {
    if (!navigator.onLine) {
      throw new Error('NO_INTERNET');
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);

      await fetch('https://www.google.com/favicon.ico', {
        mode: 'no-cors',
        signal: controller.signal,
        cache: 'no-store'
      });

      clearTimeout(timeoutId);
    } catch (error) {
      throw new Error('NETWORK_ERROR');
    }
  };

  // Enhanced error handler
  const handleError = async (error: any) => {
    let errorMessage = "An unexpected error occurred";
    let errorTitle = "Error";

    switch (true) {
      case error.message === 'NO_INTERNET':
        errorMessage = "No internet connection. Please check your network settings and try again.";
        errorTitle = "Connection Error";
        break;
      case error.message === 'NETWORK_ERROR':
        errorMessage = "Unable to connect to the server. Please check your connection and try again.";
        errorTitle = "Network Error";
        break;
      case error.message === 'Request timed out':
        errorMessage = "The request took too long to complete. Please try again.";
        errorTitle = "Timeout Error";
        break;
      case error.code === 'PERMISSION_DENIED':
        errorMessage = "You don't have permission to access this data.";
        errorTitle = "Access Denied";
        break;
      case error.code === 'FAILED_PRECONDITION':
        errorMessage = "The operation failed due to a server configuration issue.";
        errorTitle = "Server Error";
        break;
      case error.code === 'UNAVAILABLE':
        errorMessage = "The service is temporarily unavailable. Please try again later.";
        errorTitle = "Service Unavailable";
        break;
      case error instanceof TypeError:
        errorMessage = "There was a problem with the data format.";
        errorTitle = "Data Error";
        break;
      default:
        if (error.message) {
          errorMessage = error.message;
        }
    }

    setError(errorMessage);
    await showAlert(errorTitle, errorMessage, 'error');
  };

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const fetchTimelineEvents = async () => {
      if (!isMounted) return;
      
      setIsLoading(true);
      setError(null);

      try {
        await checkNetworkStatus();

        const timeoutPromise = new Promise((_, reject) => {
          setTimeout(() => {
            reject(new Error('Request timed out'));
          }, 15000);
        });

        const fetchPromise = getTimeLineEvents(100);
        const data = await Promise.race([fetchPromise, timeoutPromise]);

        if (!isMounted) return;
        
        setTimelineEvents(data as ITimelineData[]);
        setError(null);

      } catch (error: any) {
        if (!isMounted) return;
        await handleError(error);
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    const handleOnline = async () => {
      if (isMounted) {
        await showAlert('Connected', 'Internet connection restored. Refreshing data...', 'success');
        fetchTimelineEvents();
      }
    };

    const handleOffline = async () => {
      if (isMounted) {
        await showAlert('Disconnected', 'No internet connection. Some features may be unavailable.', 'warning');
        setError('No internet connection');
      }
    };

    fetchTimelineEvents();

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    return () => {
      isMounted = false;
      controller.abort();
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

        {error && (
          <div className="mb-4 p-4 bg-red-100 dark:bg-red-900 border-l-4 border-red-500 text-red-700 dark:text-red-200">
            <p className="font-bold">Error</p>
            <p>{error}</p>
          </div>
        )}

        {isLoading ? (
          <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
            <div className="animate-pulse">
              <h3 className="text-2xl font-semibold text-gray-700 dark:text-gray-200 mb-2">
                Loading Timeline Events...
              </h3>
              <p className="text-gray-500 dark:text-gray-400">Please wait</p>
            </div>
          </div>
        ) : timelineEvents.length === 0 && !error ? (
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