"use client";

import Image from "next/image";
import { getSponsors } from "@/services/sponsors.service";
import { ISponsor } from "@/interfaces/ISponsors";
import SponsorAddUpdateModal from "@/components/blocks/modals/sponsor-add-update-modal";
import { useEffect, useState } from "react";
import SponsorDeleteModal from "@/components/blocks/modals/sponsor-delete-modal";
import SponsorVisibilityToggleModal from "@/components/blocks/modals/sponsor-visibility-toggle-modal";
import { sendGTMEvent } from "@next/third-parties/google";

type SortField = "order" | "timestamp" | "name";
type SortDirection = "asc" | "desc";
type LevelFilter = "All" | "Gold" | "Silver" | "Bronze";
type VisibilityFilter = "All" | "Public" | "Hidden";

export default function ManageSponsors() {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isAddUpdateModalOpen, setIsAddUpdateModalOpen] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>("");
  const [isVisibilityModalOpen, setIsVisibilityModalOpen] = useState(false);
  const [sponsorToToggle, setSponsorToToggle] = useState<ISponsor | null>(null);

  const [sponsorToDelete, setItemToDelete] = useState<ISponsor | null>(null);
  const [sponsorToUpdate, setItemToUpdate] = useState<ISponsor | null>(null);
  const [sponsors, setSponsors] = useState([] as ISponsor[]);

  const [sortField, setSortField] = useState<SortField>("order");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [levelFilter, setLevelFilter] = useState<LevelFilter>("All");
  const [visibilityFilter, setVisibilityFilter] = useState<VisibilityFilter>("All");

  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    sendGTMEvent({
      event: "page view",
      page: "admin",
      path: window.location.pathname,
    });
  }, []);

  useEffect(() => {
    getSponsors("All").then((data) => {
      setSponsors(data);
    });
  }, [refresh]);

  const refreshData = () => {
    setRefresh(!refresh);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const handleImageClick = (imgURL: string) => {
    setSelectedImage(imgURL);
    setIsImageModalOpen(true);
  };

  const handleVisibilityToggle = (sponsor: ISponsor) => {
    setSponsorToToggle(sponsor);
    setIsVisibilityModalOpen(true);
  };

  // Filter and Sort Sponsors
  const getFilteredAndSortedSponsors = () => {
    let filtered = [...sponsors];

    if (levelFilter !== "All") {
      filtered = filtered.filter((s) => s.level === levelFilter);
    }

    if (visibilityFilter === "Public") {
      filtered = filtered.filter((s) => s.isVisibleToPublic);
    } else if (visibilityFilter === "Hidden") {
      filtered = filtered.filter((s) => !s.isVisibleToPublic);
    }

    filtered.sort((a, b) => {
      let aValue: any;
      let bValue: any;

      if (sortField === "order") {
        aValue = a.order;
        bValue = b.order;
      } else if (sortField === "timestamp") {
        aValue = a.timestamp?.toDate().getTime() || 0;
        bValue = b.timestamp?.toDate().getTime() || 0;
      } else {
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
      }

      if (sortDirection === "asc") {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });

    return filtered;
  };

  const handleDeleteClick = (sponsor: ISponsor) => {
    setItemToDelete(sponsor);
    setIsDeleteModalOpen(true);
  };

  const handleUpdateClick = (sponsor: ISponsor) => {
    setItemToUpdate(sponsor);
    setIsAddUpdateModalOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
    setItemToDelete(null);
  };

  const closeAddUpdateModal = () => {
    setIsAddUpdateModalOpen(false);
    setItemToUpdate(null);
  };

  const filteredSponsors = getFilteredAndSortedSponsors();

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="mb-8">
          <h2 className="text-4xl font-extrabold text-gray-900 dark:text-white mb-2">
            Sponsors Management
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Manage and organize your event sponsors
          </p>
        </div>

        {/* Filters and Add Button */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm p-6 mb-6">
          <div className="flex flex-col md:flex-row lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="flex flex-col sm:flex-row lg:flex-row gap-4">
              {/* Level Filter */}
              <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Level
          </label>
          <select
            value={levelFilter}
            onChange={(e) => setLevelFilter(e.target.value as LevelFilter)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All Levels</option>
            <option value="Gold">Gold</option>
            <option value="Silver">Silver</option>
            <option value="Bronze">Bronze</option>
          </select>
              </div>

              {/* Visibility Filter */}
              <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Filter by Visibility
          </label>
          <select
            value={visibilityFilter}
            onChange={(e) => setVisibilityFilter(e.target.value as VisibilityFilter)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="All">All</option>
            <option value="Public">Public</option>
            <option value="Hidden">Hidden</option>
          </select>
              </div>
            </div>

            {/* Add Button */}
            <button
              onClick={() => {
          setItemToUpdate(null);
          setIsAddUpdateModalOpen(true);
              }}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors duration-200 flex items-center gap-2 shadow-sm lg:self-end"
            >
              <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
              >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 4v16m8-8H4"
          />
              </svg>
              Add Sponsor
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              {/* Table Header */}
              <thead className="bg-gray-100 dark:bg-gray-700 border-b-2 border-gray-200 dark:border-gray-600">
                <tr>
                  <th
                    onClick={() => handleSort("name")}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Sponsor Name
                      {sortField === "name" && (
                        <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Partnership
                  </th>
                  <th
                    onClick={() => handleSort("order")}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Order
                      {sortField === "order" && (
                        <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Logo
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Visibility
                  </th>
                  <th
                    onClick={() => handleSort("timestamp")}
                    className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors"
                  >
                    <div className="flex items-center gap-2">
                      Created
                      {sortField === "timestamp" && (
                        <span>{sortDirection === "asc" ? "↑" : "↓"}</span>
                      )}
                    </div>
                  </th>
                  <th className="px-6 py-4 text-left text-xs font-semibold text-gray-700 dark:text-gray-200 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {filteredSponsors.length > 0 ? (
                  filteredSponsors.map((sponsor, index) => (
                    <tr
                      key={sponsor.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {sponsor.name}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {sponsor.partnership}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-700 dark:text-gray-300">
                          {sponsor.order}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleImageClick(sponsor.imgURL || "")}
                          className="relative w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 dark:border-gray-600 hover:border-blue-500 dark:hover:border-blue-400 transition-colors cursor-pointer group"
                        >
                          <Image
                            src={sponsor.imgURL || "/placeholder-logo.png"}
                            alt={sponsor.name}
                            fill
                            className="object-contain p-1 bg-white dark:bg-gray-800"
                          />
                          <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                            <svg
                              className="w-6 h-6 text-white"
                              fill="none"
                              stroke="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"
                              />
                            </svg>
                          </div>
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            sponsor.level === "Gold"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                              : sponsor.level === "Silver"
                              ? "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
                              : "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-200"
                          }`}
                        >
                          {sponsor.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <button
                          onClick={() => handleVisibilityToggle(sponsor)}
                          className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                            sponsor.isVisibleToPublic
                              ? "bg-green-500"
                              : "bg-gray-300 dark:bg-gray-600"
                          }`}
                        >
                          <span
                            className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                              sponsor.isVisibleToPublic
                                ? "translate-x-6"
                                : "translate-x-1"
                            }`}
                          />
                        </button>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-700 dark:text-gray-300">
                        {sponsor.timestamp?.toDate().toLocaleDateString()}
                      </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <div className="flex gap-2">
                          <button
                          onClick={() => handleUpdateClick(sponsor)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                          >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          <span className="font-medium">Edit</span>
                          </button>
                          <button
                          onClick={() => handleDeleteClick(sponsor)}
                          className="flex items-center gap-1.5 px-3 py-1.5 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                          >
                          <svg
                            className="w-4 h-4"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          <span className="font-medium">Delete</span>
                          </button>
                        </div>
                        </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan={8}
                      className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      <div className="flex flex-col items-center gap-2">
                        <svg
                          className="w-12 h-12 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 13V6a2 2 0 00-2-2H6a2 2 0 00-2 2v7m16 0v5a2 2 0 01-2 2H6a2 2 0 01-2-2v-5m16 0h-2.586a1 1 0 00-.707.293l-2.414 2.414a1 1 0 01-.707.293h-3.172a1 1 0 01-.707-.293l-2.414-2.414A1 1 0 006.586 13H4"
                          />
                        </svg>
                        <p className="text-lg font-medium">No sponsors found</p>
                        <p className="text-sm">
                          Try adjusting your filters or add a new sponsor
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Results Count */}
        {filteredSponsors.length > 0 && (
          <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
            Showing {filteredSponsors.length} of {sponsors.length} sponsors
          </div>
        )}
      </div>

      {/* Image Modal */}
      {isImageModalOpen && (
        <div
          className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
          onClick={() => setIsImageModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] bg-white dark:bg-gray-800 rounded-xl p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setIsImageModalOpen(false)}
              className="absolute -top-4 -right-4 bg-white dark:bg-gray-800 rounded-full p-2 shadow-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <svg
                className="w-6 h-6 text-gray-600 dark:text-gray-300"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
            <div className="relative w-full h-full flex items-center justify-center">
              <Image
                src={selectedImage}
                alt="Sponsor Logo"
                width={800}
                height={600}
                className="object-contain max-h-[80vh]"
              />
            </div>
          </div>
        </div>
      )}

      {/* Visibility Toggle Confirmation Modal */}
      {isVisibilityModalOpen && sponsorToToggle && (
        <SponsorVisibilityToggleModal
          sponsor={sponsorToToggle}
          onClose={() => {
            setIsVisibilityModalOpen(false);
            setSponsorToToggle(null);
          }}
          onToggle={refreshData}
        />
      )}

      {/* Modals */}
      {isAddUpdateModalOpen && (
        <SponsorAddUpdateModal
          sponsor={sponsorToUpdate ? sponsorToUpdate : undefined}
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
  );
}
