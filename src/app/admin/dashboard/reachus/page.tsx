"use client"

import { AdminDashboardLayout } from "../../admin-dashboard-layout";
import { getReachUs } from "@/services/reachus.service";
import { IContact } from "@/interfaces/IContacts";
import ReachUsContactAddUpdateModal from "@/components/blocks/modals/reach-us-contact-add-update-modal";
import { useEffect, useState } from "react";
import ReachUsContactDeleteModal from "@/components/blocks/modals/reach-us-contact-delete-modal";
import {useAuth} from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { sendGTMEvent } from "@next/third-parties/google";

export default function ManageReachUsContacts() {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);

  const [contactToDelete, setItemToDelete] = useState<IContact | null>(null);
  const [contactToUpdate, setItemToUpdate] = useState<IContact | null>(null);
  const [contacts, setContacts] = useState([] as IContact[]);

  const [refresh, setRefresh] = useState(false); // State to trigger re-fetch

  useEffect(() => {
    sendGTMEvent({ event: 'page view', page: 'admin' , path: window.location.pathname });
  }
  , []);

  useEffect(() => {
          getReachUs().then((data) => {
            setContacts(data);
          }
      );
    }, [refresh]);


    const refreshData = () => {
      setRefresh(!refresh);  // run useEffect again to refresh list
    };
    
    const handleDeleteClick = (contact: IContact) => {
        setItemToDelete(contact);
        setIsDeleteModalOpen(true);
        refreshData();
      };

    const handleUpdateClick = (contact: IContact) => {
      setItemToUpdate(contact);
      setIsAddUpdateModalOpen(true);
      refreshData();
    }

    const closeDeleteModal = () => {
        setIsDeleteModalOpen(false);
        setItemToDelete(null);
    };

    const closeAddUpdateModal = () => {
      setIsAddUpdateModalOpen(false);
      setItemToUpdate(null);
    }

  return (
    <AdminDashboardLayout>
      <div className="dashboard-content p-6 w-4/5 mx-auto rounded-lg ">
        <h2 className="text-4xl font-extrabold dark:text-white">Contacts</h2>
        <p className="my-4 text-lg dark:text-gray-300">Manage Contacts here</p>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Line
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact name
                </th>
                <th scope="col" className="px-2 py-3">
                  Photo
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Contact Tel
                </th>
                <th scope="col" className="px-6 py-3">
                  Post
                </th>
                <th scope="col" className="px-6 py-3">
                  Visiblity
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {contacts.length > 0 && contacts.map((contact) => (
                <tr
                  key={contact.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {contact.line}
                  </th>
                  
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {contact.name}
                  </th>
                  <div className="px-2 relative overflow-visible">
                    <Image
                      src={`${contact.photo}`}
                      alt={`${contact.name} Photo`}
                      width={50}
                      height={50}
                      className="transition-transform duration-300 ease-in-out transform hover:scale-[5] hover:border-slate-800 p-0 dark:bg-black bg-white"
                    />
                  </div>

                  <td className="px-6 py-4">
                    {contact.email}
                  </td>
                  <td className="px-6 py-4">{contact.contact}</td> 
                  <td className="px-6 py-4">{contact.post}</td>
                
                  <td className="px-6 py-4">
                      {contact.isVisibleToPublic ? (
                        <span className="bg-green-500 text-white p-1 px-2 font-medium rounded-lg ">Public</span>
                      ) : (
                        <span className="bg-red-500 text-white p-1 px-2 font-medium rounded-lg ">Hidden</span>
                      )}
                    </td>

                  <td className="px-3 py-4">
                  <button className="text-blue-500 m-2"
                        onClick={
                            () => handleUpdateClick(contact)
                        }>
                        Update
                    </button>
                    <button className="text-red-500 m-2"
                        onClick={
                            () => handleDeleteClick(contact)
                        }>
                        Delete
                    </button>
                  </td>
                </tr>
              ))}

              {contacts.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No reach us contacts were found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div className="mt-3">
        <button 
          onClick={() => 
            {
              setItemToUpdate(null);
              setIsAddUpdateModalOpen(true);
            }
          } 
          className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
          type="button">
        Add Contact
      </button>
        {isAddUpdateModalOpen && (
          <ReachUsContactAddUpdateModal 
              contact={contactToUpdate ?  contactToUpdate : undefined}
              onAddUpdatecontact={refreshData} 
              onClose={closeAddUpdateModal}
          />
        )}

        {isDeleteModalOpen && contactToDelete && (
                  <ReachUsContactDeleteModal
                      contact={contactToDelete}
                      onClose={closeDeleteModal}
                      onDelete={refreshData}
                  />
          )}
        </div>
     
      </div>
    </AdminDashboardLayout>
  );
}
