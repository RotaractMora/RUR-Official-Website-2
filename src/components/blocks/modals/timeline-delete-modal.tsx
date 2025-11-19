'use client';
import React from 'react';
import { deleteTimeLineEvent } from '@/services/timeline.service';
import { ITimelineData } from '@/interfaces/ITimeline';
import { deleteFile, getFileReferenceByUrl } from '@/services/firebaseStorage.service';

function TimelineDeleteModal({
  event,
  onClose,
  onDelete,
}: {
  event: ITimelineData;
  onClose: () => void;
  onDelete: () => void;
}) {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (event.id) {
      // Delete image from storage if it exists
      if (event.imgURL && event.imgURL.startsWith('https://firebasestorage.googleapis.com')) {
        try {
          const fileRef = await getFileReferenceByUrl(event.imgURL);
          if (fileRef) {
            const deleteResult = await deleteFile(fileRef);
            if (deleteResult) {
              console.log('Image deleted successfully');
            }
          }
        } catch (error) {
          console.error('Error deleting image: ', error);
        }
      }

      // Delete the timeline event from Firestore
      try {
        await deleteTimeLineEvent(event.id);
        console.log('Timeline event deleted successfully');
        onDelete();
        onClose();
      } catch (error) {
        console.error('Error deleting timeline event: ', error);
        alert('Error deleting timeline event');
        onClose();
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50">
      <div className="relative p-6 w-full max-w-lg">
        <div className="bg-white rounded-xl shadow-lg dark:bg-gray-800">
          <div className="flex items-center justify-between px-6 py-4 border-b dark:border-gray-700">
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
              Delete Timeline Event
            </h3>
            <button
              onClick={onClose}
              className="text-gray-500 hover:bg-gray-100 p-2 rounded-full transition dark:hover:bg-gray-700"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                ></path>
              </svg>
            </button>
          </div>

          <form className="px-6 py-5" onSubmit={handleSubmit}>
            <p className="text-lg font-medium text-gray-900 dark:text-white">
              Are you sure you want to delete this timeline event?
            </p>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
              This action cannot be undone.
            </p>

            <div className="mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
              <p className="text-gray-800 dark:text-gray-200 text-base font-semibold">
                {event.title}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">
                Event Date: {event.eventDate.toDate().toLocaleString()}
              </p>
              <p className="text-gray-600 dark:text-gray-400 text-sm mt-1">Order: {event.order}</p>
            </div>

            <div className="flex justify-end gap-4 mt-6">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-700 font-semibold rounded-lg transition dark:bg-gray-600 dark:hover:bg-gray-500 dark:text-gray-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-semibold rounded-lg transition dark:bg-red-700 dark:hover:bg-red-800"
              >
                Delete
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TimelineDeleteModal;
