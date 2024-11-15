"use client"
import React, { useState } from 'react';
import { addSponsor } from '@/services/sponsors.service';
import { SponsorLevel } from '@/interfaces/ISponsors';
import { addFile } from '@/services/firebaseStorage.service';
import { getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

function SponsorAddUpdateModal({onAddSponsor}: {onAddSponsor: () => void}) {
  
  const [isOpen, setIsOpen] = useState(false);
  const [sponsorName, setSponsorName] = useState('');
  const [sponsorLevel, setSponsorLevel] = useState('');
  const [sponsorImageFile, setSponsorImageFile] = useState<File | null>(null);
  const [sponsorImgURL, setSponsorImgURL] = useState('');

  // Handle file selection or drag-and-drop
  const handleFileChange = (e: any) => {
    e.preventDefault();

    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file) {
      setSponsorImageFile(file);
    }
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setSponsorName('');
    setSponsorLevel('');
    setSponsorImageFile(null);
    setSponsorImgURL('');

    setIsOpen(!isOpen);
  };


  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!sponsorName || !sponsorLevel || !sponsorImageFile) {
      return;
    }

    if (sponsorLevel !== 'Gold' && sponsorLevel !== 'Silver' && sponsorLevel !== 'Bronze') {
      alert('Please select a valid sponsor level');
      return;
    }

    // validate image file type
    if (!sponsorImageFile.type.includes('image')) {
      alert('Please select a valid image file');
      return;
    }

    // validate image file size
    if (sponsorImageFile.size > 1024 * 1024 * 2) {
      alert('Please select an image file less than 2MB');
      return;
    }

    // Upload image to firebase storage and get URL
    addFile(sponsorImageFile).then((ref) => {
      if (ref) {
        console.log("StorageReference :",ref);
        getDownloadURL(ref).then((url) => {
          console.log('Image URL: ', url);

          // Create new sponsor object
          const newSponsor = {
            name: sponsorName,
            level: sponsorLevel as SponsorLevel,
            imgURL: url,
          };

          // Add new sponsor to firestore
          addSponsor(newSponsor)
          .then(() => {
            console.log('Sponsor added successfully', newSponsor);
            onAddSponsor();
            toggleModal();
          })
          .catch((error) => {
            console.error('Error adding sponsor: ', error);
            alert('Error adding sponsor');
            toggleModal();
          }); 
        });
      }
    }).catch((error) => {
      console.error('Error uploading file: ', error);
      alert('Error uploading file');
      return;
    });

  }

  return (
    <>
      <button 
        onClick={toggleModal} 
        className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" 
        type="button">
        Add Sponsor
      </button>

      {isOpen && (
        <div 
          id="crud-modal" 
          tabIndex={-1} 
          aria-hidden="true" 
          className="fixed inset-0 z-50 flex justify-center items-center w-full h-full bg-black bg-opacity-50"
        >
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

              <form className="p-4 md:p-5" onSubmit={handleSubmit}>
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
                      onChange={(e) => setSponsorName(e.target.value)}
                    />
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="sponsorLevel" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Category</label>
                    <select 
                      id="sponsorLevel" 
                      value={sponsorLevel}
                      onChange={(e) => setSponsorLevel(e.target.value)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      required
                      >
                      <option value="" disabled>Select Level</option>
                      <option value="Gold">Gold</option>
                      <option value="Silver">Silver</option>
                      <option value="Bronze">Bronze</option>
                    </select>
                  </div>

                  <div className="col-span-2">
                    <label htmlFor="image-upload" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Upload Image</label>
                    <div 
                      className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                      onDrop={handleFileChange}
                      onDragOver={(e) => e.preventDefault()}
                      onClick={() => document.getElementById('image-upload')?.click()}  // Trigger file input click on div click
                    >
                      {sponsorImageFile ? (
                        <div className="relative w-full h-full">
                          <Image
                            src={URL.createObjectURL(sponsorImageFile)}
                            alt="Uploaded Image"
                            className="w-full h-full object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => setSponsorImageFile(null)}
                            className="absolute -top-2 -right-2 text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-6 h-6 flex justify-center items-center dark:hover:bg-gray-600 dark:bg-gray-700 dark:hover:text-white border border-gray-300 dark:border-gray-600"
                          >
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                            </svg>
                            <span className="sr-only">Remove image</span>
                          </button>
                        </div>
                      ) : (
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                          </svg>
                          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
                        </div>
                      )}
                      <input
                        id="image-upload"
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={handleFileChange}
                      />
                    </div>
                  </div>
                  </div>

                <button
                  type="submit"
                  className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                >
                  Save
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