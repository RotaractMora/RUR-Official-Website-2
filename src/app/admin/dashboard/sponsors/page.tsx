import Image from "next/image";
import { AdminDashboardLayout } from "../admin-dashboard-layout"

export default function ManageSponsors() {
  

  let sponsors = [
    {
      sponsor: "Apple",
      image: "Apple Logo",
      level: "Gold",
      createdTime: "Date"
    }
  ]


  return (
    <AdminDashboardLayout>
    <div className="dashboard-content p-6 container mx-auto rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4">sponsors</h1>
      <p className="text-lg">Manage sponsors here.</p>


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
                    <tr className="odd:bg-white odd:dark:bg-gray-900 even:bg-gray-50 even:dark:bg-gray-800 border-b dark:border-gray-700">
                        <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                            Apple
                        </th>
                        <td className="px-6 py-4">
                            <Image src="/images/apple-logo.png" alt="Apple Logo" width={40} height={40} className="p-0 rounded-lg dark:bg-black bg-white"/>
                        </td>
                        <td className="px-6 py-4">
                            
                        </td>
                        <td className="px-6 py-4">
                            2024-11-11 12:00:00
                        </td>
                        <td className="px-6 py-4">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td>
                    </tr>
        
                </tbody>
            </table>
            
        </div>

    </div>
    </AdminDashboardLayout>
  );
}
