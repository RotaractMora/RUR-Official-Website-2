"use client";

import React, { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";
import Link from "next/link";

const AdminDashboard: React.FC = () => {
  useEffect(() => {
    sendGTMEvent({
      event: "page view",
      page: "admin",
      path: window.location.pathname,
    });
  }, []);

  const oporations = [
    {
      name: "Reach Us",
      description: "Edit/update contact details and order on the website.",
      link: "/admin/dashboard/reachus",
    },
    {
      name: "Sponsors",
      description: "Edit/update sponsor details and order.",
      link: "/admin/dashboard/sponsors",
    },
    {
      name: "Timeline",
      description: "Edit/update timeline events and set event date.",
      link: "/admin/dashboard/timeline",
    },
  ];

  return (
    <div className="min-h-screen bg-custom-color-700 dark:bg-custom-dark-color-400 flex flex-col text-white">
      <header className="bg-custom-color-800 dark:bg-custom-dark-color-400 ">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900 ">Admin Dashboard</h1>
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {oporations.map((oporation, index) => (
                <Link href={oporation.link} key={index}>
                  <div className="bg-custom-color-800 dark:bg-custom-dark-color-800 p-6 rounded-lg">
                    <h2 className="text-xl font-bold mb-2">{oporation.name}</h2>
                    <p className="text-gray-700 dark:text-white">
                      {oporation.description}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
