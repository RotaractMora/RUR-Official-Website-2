"use client"
import React, { useState } from 'react';
import { deleteReachUsContact } from '@/services/reachus.service';
import { IContact } from '@/interfaces/IContacts';

function ReachUsContactDeleteModal(
    {contact, onClose, onDelete }: {contact: IContact, onClose: () => void, onDelete: () => void}
) {

  const [contactToDelete, setContactToDelete] = useState<IContact | null>(contact);

  const toggleModal = () => {
    setContactToDelete(null);
    onClose();
  };


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  
    if (contactToDelete?.id) {

      if (contactToDelete?.id) {
        deleteReachUsContact(contactToDelete.id)
          .then(() => {
              console.log("contact deleted successfully");
              onDelete();
              toggleModal();
              })
          .catch((error) => {
              console.error("Error deleting contact: ", error);
              alert("Error deleting contact");
              toggleModal();
          });
        }
        
      } else {
        console.error("contact ID is undefined");
      }
  } 

  return (
    <>
      <div
        tabIndex={-1}
        aria-hidden="true"
        className="fixed inset-0 z-50 flex items-center justify-center w-full h-full bg-black bg-opacity-50"
      >
        <div className="relative p-6 w-full max-w-lg">
          <div className="bg-white rounded-xl shadow-lg dark:bg-gray-800 overflow-hidden">
            <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 dark:border-gray-700">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                Delete Contact
              </h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-700 p-2 rounded-full transition"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
  
            <form className="px-6 py-5" onSubmit={handleSubmit}>
              <p className="text-lg font-medium text-gray-900 dark:text-white">
                Are you sure you want to delete this Contact?
              </p>
              <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                This action cannot be undone.
              </p>
  
              {contactToDelete && (
                <div className="mt-4 bg-gray-100 dark:bg-gray-700 rounded-lg p-4">
                  <p className="text-gray-800 dark:text-gray-200 text-base font-semibold">
                    {contactToDelete.name} - {contactToDelete.post} Contact
                    <span>
                      {contactToDelete.email} - {contactToDelete.contact}
                    </span>
                  </p>
                  
                </div>
              )}
  
              <div className="flex justify-end gap-4 mt-6">
                <button
                  type="button"
                  onClick={toggleModal}
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
    </>
  );
}

export default ReachUsContactDeleteModal;