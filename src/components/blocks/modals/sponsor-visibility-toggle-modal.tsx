"use client";

import { ISponsor } from "@/interfaces/ISponsors";
import { updateSponsorVisibility } from "@/services/sponsors.service";
import { useState } from "react";

interface SponsorVisibilityToggleModalProps {
  sponsor: ISponsor;
  onClose: () => void;
  onToggle: () => void;
}

export default function SponsorVisibilityToggleModal({
  sponsor,
  onClose,
  onToggle,
}: SponsorVisibilityToggleModalProps) {
  const [isTogglingVisibility, setIsTogglingVisibility] = useState(false);
  const [visibilityError, setVisibilityError] = useState<string | null>(null);

  const confirmVisibilityToggle = async () => {
    if (!sponsor || !sponsor.id) return;

    setIsTogglingVisibility(true);
    setVisibilityError(null);

    try {
      await updateSponsorVisibility(sponsor.id, !sponsor.isVisibleToPublic);

      setIsTogglingVisibility(false);
      onToggle();
      onClose();
    } catch (error) {
      console.error("Error toggling visibility:", error);
      setVisibilityError("Failed to update visibility. Please try again.");
      setIsTogglingVisibility(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 max-w-md w-full shadow-xl">
        <div className="flex items-center gap-3 mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {sponsor.isVisibleToPublic ? "Hide" : "Show"} Sponsor
          </h3>
        </div>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Are you sure you want to make this sponsor{" "}
          <span className="font-semibold">
            {sponsor.isVisibleToPublic ? "hidden" : "public"}
          </span>
          ?
        </p>
        {visibilityError && (
          <p className="text-red-500 text-sm mb-4">{visibilityError}</p>
        )}
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            disabled={isTogglingVisibility}
            className="px-4 py-2 text-gray-700 dark:text-gray-300 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
          <button
            onClick={confirmVisibilityToggle}
            disabled={isTogglingVisibility}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          >
            {isTogglingVisibility ? (
              <>
                <svg
                  className="animate-spin h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Processing...
              </>
            ) : (
              "Confirm"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
