import Image from "next/image";
import { AdminDashboardLayout } from "../admin-dashboard-layout"
import { getSponsors } from "@/services/sponsors.service";
import { ISponsor } from  "@/interfaces/ISponsors";
import SponsorAddUpdateModal from "@/components/ui/modals/sponsor-add-update-modal";

export default async function ManageSponsors() {
  
  let sponsors: ISponsor[] = await getSponsors("All", 100); // implement pagination later for now 100

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
                            Created Time
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                    {sponsors.map((sponsor) => (
                      <tr key={sponsor.id} className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            {sponsor.name}
                        </th>
                        <td className="px-6 py-4">
                            <Image src={`${sponsor.imgURL}`} alt={`${sponsor.name} Logo`} width={40} height={40} className="p-0 rounded-lg dark:bg-black bg-white"/>
                        </td>
                        <td className="px-6 py-4">
                            {sponsor.level}
                        </td>
                        <td className="px-6 py-4">
                          {sponsor.timestamp?.toDate().toLocaleString()} 
                        </td>
                        <td className="px-6 py-4">
                            <button className="text-red-500">Delete</button>
                        </td>
                      </tr>
                    ))}
                </tbody>
            </table>
         </div>
         <div className="mt-3">
            <SponsorAddUpdateModal />
         </div>

    </div>
    </AdminDashboardLayout>
  );
}
