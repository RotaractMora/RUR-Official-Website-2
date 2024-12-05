"use client"

import Image from "next/image";
import { AdminDashboardLayout } from "../../admin-dashboard-layout";
import { getSponsors } from "@/services/sponsors.service";
import { ISponsor } from "@/interfaces/ISponsors";
import SponsorAddUpdateModal from "@/components/blocks/modals/sponsor-add-update-modal";
import { useEffect, useState } from "react";
import SponsorDeleteModal from "@/components/blocks/modals/sponsor-delete-modal";
import {useAuth} from "@/context/auth-provider";
import { useRouter } from "next/navigation";
import { sendGTMEvent } from "@next/third-parties/google";

export default function ManageSponsors() {

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);

  const [sponsorToDelete, setItemToDelete] = useState<ISponsor | null>(null);
  const [sponsorToUpdate, setItemToUpdate] = useState<ISponsor | null>(null);
  const [sponsors, setSponsors] = useState([] as ISponsor[]);

  const [refresh, setRefresh] = useState(false); // State to trigger re-fetch

  useEffect(() => {
    sendGTMEvent({ event: 'page view', page: 'admin' , path: window.location.pathname });
    }
    , []);

  useEffect(() => {
        getSponsors("All").then((data) => {
            setSponsors(data);
        }
        );
    }, [refresh]);


    const refreshData = () => {
      setRefresh(!refresh);  // run useEffect again to refresh list
    };
    
    const handleDeleteClick = (sponsor: ISponsor) => {
        setItemToDelete(sponsor);
        setIsDeleteModalOpen(true);
        refreshData();
      };

    const handleUpdateClick = (sponsor: ISponsor) => {
      setItemToUpdate(sponsor);
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
        <h2 className="text-4xl font-extrabold dark:text-white">Sponsors</h2>
        <p className="my-4 text-lg dark:text-gray-300">Manage Sponsors here</p>
        {/* <p className="mb-4 text-lg font-normal text-gray-500 dark:text-gray-400">Deliver great service experiences fast - without the complexity of traditional ITSM solutions. Accelerate critical development work, eliminate toil, and deploy changes with ease.</p> */}

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Sponsor name
                </th>
                <th scope="col" className="px-6 py-3">
                  Image
                </th>
                <th scope="col" className="px-6 py-3">
                  Sponsor Level
                </th>
                <th scope="col" className="px-6 py-3">
                  Visibility
                </th>
                <th scope="col" className="px-6 py-3">
                  Created Time
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {sponsors.length > 0 && sponsors.map((sponsor) => (
                <tr
                  key={sponsor.id}
                  className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                  >
                    {sponsor.name}
                  </th>
                  <td className="px-6 py-4">
                  <div className="relative overflow-visible">
                  <Image
                    src={`${sponsor.imgURL}`}
                    alt={`${sponsor.name} Logo`}
                    width={50}
                    height={50}
                    className="transition-transform duration-300 ease-in-out transform hover:scale-[5] hover:border-slate-800 p-0 dark:bg-black bg-white"
                  />
                </div>
                
                  </td>
                  <td className="px-6 py-4">{sponsor.level}</td>
                  <td className="px-6 py-4">
                    {sponsor.isVisibleToPublic && <span className="bg-green-500 text-white p-1 px-2 font-medium rounded-lg ">Public</span>}
                    {!sponsor.isVisibleToPublic && <span className="bg-red-500 text-white p-1 px-2 font-medium rounded-lg ">Hidden</span>}
                    </td>
                  <td className="px-6 py-4">
                    {sponsor.timestamp?.toDate().toLocaleString()}
                  </td>
                  <td className="px-3 py-4">
                  <button className="text-blue-500 m-2"
                        onClick={
                            () => handleUpdateClick(sponsor)
                        }>
                        Update
                    </button>
                    <button className="text-red-500 m-2"
                        onClick={
                            () => handleDeleteClick(sponsor)
                        }>
                        Delete
                    </button>
                  </td>
                </tr>
              ))}

              {sponsors.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center py-4">
                    No sponsors found
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
        Add Sponsor
      </button>
        {isAddUpdateModalOpen && (
          <SponsorAddUpdateModal 
              sponsor={sponsorToUpdate ?  sponsorToUpdate : undefined}
              onAddUpdateSponsor={refreshData} 
              onClose={closeAddUpdateModal}
          />
        )}

        {isDeleteModalOpen && sponsorToDelete && (
                  <SponsorDeleteModal
                      sponsor={sponsorToDelete}
                      onClose={closeDeleteModal}
                      onDelete={refreshData}
                  />
          )}
        </div>
     
      </div>
    </AdminDashboardLayout>
  );
}
