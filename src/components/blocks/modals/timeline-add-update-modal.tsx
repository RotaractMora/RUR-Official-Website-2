"use client"
import React, { useState } from 'react';
import { addTimeLineEvent } from '@/services/timeline.service';
import Image from 'next/image';
import { Timestamp } from 'firebase/firestore';
import { getDownloadURL } from 'firebase/storage';
import { addFile } from '@/services/firebaseStorage.service';

function TimelineAddUpdateModal({onAddEvent}: {onAddEvent: () => void}) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [btnText, setBtnText] = useState('');
  const [btnLink, setBtnLink] = useState('');
  const [order, setOrder] = useState(0);
  const [isBtnDisabled, setIsBtnDisabled] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);

  // Handle file selection or drag-and-drop
  const handleFileChange = (e: any) => {
    e.preventDefault();
    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  const toggleModal = () => {
    setTitle('');
    setDescription('');
    setEventDate('');
    setBtnText('');
    setBtnLink('');
    setOrder(0);
    setIsBtnDisabled(false);
    setImageFile(null);
    setIsOpen(!isOpen);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!title || !description || !eventDate || !imageFile) {
      alert('Please fill in all required fields');
      return;
    }

    // validate image file type
    if (!imageFile.type.includes('image')) {
      alert('Please select a valid image file');
      return;
    }

    // validate image file size
    if (imageFile.size > 1024 * 1024 * 2) {
      alert('Please select an image file less than 2MB');
      return;
    }

    // Upload image to firebase storage and get URL
    addFile(imageFile).then((ref) => {
      if (ref) {
        getDownloadURL(ref).then((url) => {
          // Create new timeline event object
          const newEvent = {
            title,
            description,
            eventDate: Timestamp.fromDate(new Date(eventDate)),
            btnText,
            btnLink,
            isBtnDisabled,
            order,
            imgURL: url,
          };

          // Add new event to firestore
          addTimeLineEvent(newEvent)
            .then(() => {
              console.log('Event added successfully', newEvent);
              onAddEvent();
              toggleModal();
            })
            .catch((error) => {
              console.error('Error adding event: ', error);
              alert('Error adding event');
              toggleModal();
            });
        });
      }
    }).catch((error) => {
      console.error('Error uploading file: ', error);
      alert('Error uploading file');
    });
  };

  return (
    <>
      <button 
        onClick={toggleModal} 
        className="inline-flex items-center px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5" 
        type="button"
      >
        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
        </svg>
        Add Timeline Event
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center overflow-hidden bg-black bg-opacity-50 backdrop-blur-sm">
          <div className="relative w-full max-w-2xl mx-4 my-8">
            <div className="relative bg-white rounded-xl shadow-2xl dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {/* Modal Header */}
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Add New Timeline Event
                </h3>
                <button 
                  onClick={toggleModal}
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-2 inline-flex items-center transition-colors duration-200"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Modal Body - Scrollable */}
              <div className="p-6 space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto custom-scrollbar">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Title Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Title
                    </label>
                    <input 
                      type="text" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required 
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="Enter event title"
                    />
                  </div>

                  {/* Description Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Description
                    </label>
                    <textarea 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200 min-h-[100px]"
                      required 
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Enter event description"
                    />
                  </div>

                  {/* Date Input */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Event Date
                    </label>
                    <input 
                      type="datetime-local" 
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                      required 
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                  </div>

                  {/* Button Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Button Text
                      </label>
                      <input 
                        type="text" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        value={btnText}
                        onChange={(e) => setBtnText(e.target.value)}
                        placeholder="Enter button text"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Button Link
                      </label>
                      <input 
                        type="url" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        value={btnLink}
                        onChange={(e) => setBtnLink(e.target.value)}
                        placeholder="https://example.com"
                      />
                    </div>
                  </div>

                  {/* Order and Disabled Settings */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Order
                      </label>
                      <input 
                        type="number" 
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                        required 
                        value={order}
                        onChange={(e) => setOrder(parseInt(e.target.value))}
                      />
                    </div>
                    <div className="flex items-center mt-8">
                      <input 
                        type="checkbox" 
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 transition-colors duration-200"
                        checked={isBtnDisabled}
                        onChange={(e) => setIsBtnDisabled(e.target.checked)}
                      />
                      <label className="ml-2 text-sm font-medium text-gray-700 dark:text-gray-300">
                        Disable Button
                      </label>
                    </div>
                  </div>

                  {/* Image Upload */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Upload Image
                    </label>
                    <div 
                      className="relative border-2 border-dashed border-gray-300 rounded-lg p-6 transition-all duration-200 hover:border-blue-500 cursor-pointer"
                      onDrop={handleFileChange}
                      onDragOver={(e) => e.preventDefault()}
                    >
                      {imageFile ? (
                        <div className="relative w-full h-48">
                          <Image
                            src={URL.createObjectURL(imageFile)}
                            alt="Preview"
                            className="w-full h-full object-cover rounded-lg"
                            width={300}
                            height={200}
                          />
                          <button
                            type="button"
                            onClick={() => setImageFile(null)}
                            className="absolute -top-2 -right-2 bg-white rounded-full p-1 shadow-lg hover:bg-gray-100 transition-colors duration-200"
                          >
                            <svg className="w-4 h-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ) : (
                        <div className="text-center">
                          <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 48 48">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02" />
                          </svg>
                          <div className="mt-4 flex text-sm text-gray-600">
                            <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-blue-500">
                              <span>Upload a file</span>
                              <input
                                id="image-upload"
                                type="file"
                                className="sr-only"
                                accept="image/*"
                                onChange={handleFileChange}
                              />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                          </div>
                          <p className="text-xs text-gray-500">PNG, JPG or GIF up to 2MB</p>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="sticky bottom-0 bg-white dark:bg-gray-800 pt-4">
                    <button
                      type="submit"
                      className="w-full px-6 py-3 text-white bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 rounded-lg text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-0.5"
                    >
                      Save Event
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #f1f1f1;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #888;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #666;
        }
      `}</style>
    </>
  );
}

export default TimelineAddUpdateModal;