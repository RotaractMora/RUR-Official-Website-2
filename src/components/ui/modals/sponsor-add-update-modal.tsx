"use client"
import React, { useState } from 'react';

function SponsorAddUpdateModal() {
  
  const [isOpen, setIsOpen] = useState(false);

  const toggleModal = () => {
    setIsOpen(!isOpen);
    console.log('Modal toggled', isOpen);
  };
  return (
    <>
      <button 
        onClick={toggleModal} 
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
        type="button">
        Toggle modal
      </button>

      {isOpen && (
        <div 
          id="crud-modal" 
          tabIndex={-1} 
          aria-hidden="true" 
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50">
          <div className="relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Add New Sponsor
                </h3>
                <button 
                  type="button" 
                  onClick={toggleModal} 
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white">
                  <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <form className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                  <div className="col-span-2">
                    <label htmlFor="sponsorName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sponsor Name</label>
                    <input 
                      type="text" 
                      name="sponsorName" 
                      id="sponsorName" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="Type sponsor name" 
                      required 
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="sponsorAmount" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Sponsorship Amount</label>
                    <input 
                      type="number" 
                      name="sponsorAmount" 
                      id="sponsorAmount" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="$1000" 
                      required 
                    />
                  </div>

                  <div className="col-span-2 sm:col-span-1">
                    <label htmlFor="sponsorCategory" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select 
                      id="sponsorCategory" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      defaultValue="">
                      <option value="" disabled>Select category</option>
                      <option value="corporate">Corporate</option>
                      <option value="individual">Individual</option>
                      <option value="non-profit">Non-Profit</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="sponsorDescription" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Description</label>
                    <textarea 
                      id="sponsorDescription" 
                      rows={4} 
                      className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="Describe the sponsorship details here">
                    </textarea>
                  </div>
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-800 hover:bg-blue-900 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default SponsorAddUpdateModal;