'use client';
import React, { useState } from 'react';
import { addReachUsContact, updateReachUsContact } from '@/services/reachus.service';
import { IContact } from '@/interfaces/IContacts';
import { addFile, deleteFile, getFileReferenceByUrl } from '@/services/firebaseStorage.service';
import { getDownloadURL } from 'firebase/storage';
import Image from 'next/image';

function ReachUsContactAddUpdateModal({
  contact,
  onAddUpdatecontact,
  onClose,
}: {
  contact?: IContact;
  onAddUpdatecontact: () => void;
  onClose: () => void;
}) {
  const [contactName, setcontactName] = useState(contact?.name || '');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [contactEmail, setcontactEmail] = useState(contact?.email || '');
  const [contactTelContact, setcontactTelContact] = useState(contact?.contact || '');
  const [contactPost, setcontactPost] = useState(contact?.post || '');
  const [isVisibleToPublic, setisVisibleToPublic] = useState(contact?.isVisibleToPublic || false);
  const [contactPhotoURL, setContactPhotoURl] = useState(contact?.photo || '');
  const [uploadNewImage, setUploadNewImage] = useState(contact?.photo ? false : true);
  const [line, setLine] = useState(contact?.line || 0);

  // Handle file selection or drag-and-drop
  const handleFileChange = (e: any) => {
    e.preventDefault();

    const file = e.target.files ? e.target.files[0] : e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
    }
  };

  // Toggle modal visibility
  const toggleModal = () => {
    setcontactName('');
    setImageFile(null);
    setContactPhotoURl('');
    setcontactEmail('');
    setcontactTelContact('');
    setcontactPost('');
    setisVisibleToPublic(false);
    onClose();
  };

  const validateImage = (file: File) => {
    if (!file.type.includes('image')) {
      alert('Please select a valid image file');
      return false;
    }

    if (file.size > 1024 * 1024 * 2) {
      alert('Please select an image file less than 2MB');
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!contactName || !contactEmail || !contactTelContact || !contactPost) {
      return;
    }

    // validate email with regex
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,}$/;
    if (!emailRegex.test(contactEmail)) {
      alert('Invalid email address');
      return;
    }

    // validate contact tel
    const contactTelRegex = /^\+?[1-9]\d{0,2}(?:[ -]?\d+)*$/;
    if (!contactTelRegex.test(contactTelContact)) {
      alert('Invalid contact number');
      return;
    }

    let imgURL = contact?.photo || '';

    try {
      // Handle image upload
      if (uploadNewImage && imageFile) {
        if (!validateImage(imageFile)) return;

        const ref = await addFile(imageFile);
        if (ref) {
          imgURL = await getDownloadURL(ref);
        } else {
          throw new Error('Failed to get storage reference');
        }

        if (contact?.photo) {
          // Delete the old image
          const oldImgRef = await getFileReferenceByUrl(contact.photo);
          if (oldImgRef) {
            await deleteFile(oldImgRef)
              .then(() => {
                console.log('Old image deleted successfully');
              })
              .catch((error) => {
                console.error('Error deleting old image:', error);
                alert('Error deleting old image. Please try again.');
                return;
              });
          }
        }
      } else if (uploadNewImage && !imageFile) {
        alert('Please select an image file');
        return;
      }

      const contactData = {
        name: contactName,
        email: contactEmail,
        contact: contactTelContact,
        post: contactPost,
        photo: imgURL,
        line: line,
        isVisibleToPublic: isVisibleToPublic,
      };

      if (contact?.id) {
        await updateReachUsContact(contact.id, contactData);
        console.log('contact updated successfully:', contactData);
      } else {
        await addReachUsContact(contactData);
        console.log('contact added successfully:', contactData);
      }

      //success
      onAddUpdatecontact();
      toggleModal();
    } catch (error) {
      console.error('Error processing contact:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <>
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
                {contact ? 'Update contact' : 'Add contact'}
              </h3>
              <button
                type="button"
                onClick={toggleModal}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>

            <form className="p-4 md:p-5" onSubmit={handleSubmit}>
              <div className="grid gap-4 mb-4 grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="contactName"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Name
                  </label>
                  <input
                    type="text"
                    name="contactName"
                    id="contactName"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type contact name"
                    required
                    value={contactName}
                    onChange={(e) => setcontactName(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactEmail"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Email
                  </label>
                  <input
                    type="email"
                    name="contactEmail"
                    id="contactEmail"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="eg: john@example.com"
                    required
                    pattern="^[\w\-\.]+@([\w\-]+\.)+[\w\-]{2,}$"
                    value={contactEmail}
                    onChange={(e) => setcontactEmail(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactLine"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Line
                  </label>
                  <select
                    name="contactLine"
                    id="contactLine"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    required
                    onChange={(e) => setLine(parseInt(e.target.selectedOptions[0].value))}
                  >
                    <option value="4" selected={line === 4}>
                      Line 4
                    </option>
                    <option value="1" selected={line === 1}>
                      Line 1
                    </option>
                    <option value="2" selected={line === 2}>
                      Line 2
                    </option>
                    <option value="3" selected={line === 3}>
                      Line 3
                    </option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="contactTelContact"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Telephone
                  </label>
                  <input
                    type="tel"
                    name="contactTelContact"
                    id="contactTelContact"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="eg: 0123456789"
                    required
                    value={contactTelContact}
                    minLength={10}
                    maxLength={16}
                    onChange={(e) => setcontactTelContact(e.target.value)}
                  />
                </div>

                <div>
                  <label
                    htmlFor="contactPost"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Contact Post
                  </label>
                  <input
                    type="text"
                    name="contactPost"
                    id="contactPost"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                    placeholder="Type contact post"
                    required
                    value={contactPost}
                    onChange={(e) => setcontactPost(e.target.value)}
                  />
                </div>
                <div>
                  <label
                    htmlFor="isVisibleToPublic"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Visibility
                  </label>
                  <div className="flex items-center space-x-2 mt-4">
                    <input
                      type="checkbox"
                      name="isVisibleToPublic"
                      id="isVisibleToPublic"
                      className="text-primary-600 focus:ring-primary-600 h-4 w-4 rounded"
                      checked={isVisibleToPublic}
                      onChange={(e) => setisVisibleToPublic(e.target.checked)}
                    />
                    <label
                      htmlFor="isVisibleToPublic"
                      className="text-sm text-gray-900 dark:text-white"
                    >
                      Visible to public
                    </label>
                  </div>
                </div>
                <div className="col-span-2">
                  {uploadNewImage ? (
                    <>
                      <label
                        htmlFor="image-upload"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Upload Image
                      </label>
                      <div
                        className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500"
                        onDrop={handleFileChange}
                        onDragOver={(e) => e.preventDefault()}
                        onClick={() => document.getElementById('image-upload')?.click()} // Trigger file input click on div click
                      >
                        {imageFile ? (
                          <div className="relative w-full h-full">
                            <Image
                              src={URL.createObjectURL(imageFile)}
                              alt="Uploaded Image"
                              className="w-full h-full object-cover rounded-lg"
                              width={800}
                              height={400}
                            />

                            <button
                              type="button"
                              onClick={() => {
                                setImageFile(null);
                                if (contact?.photo) {
                                  setUploadNewImage(false);
                                }
                              }}
                              className="absolute -top-2 -right-2 text-gray-400 bg-gray-100 hover:bg-gray-200 hover:text-gray-900 rounded-full text-sm w-6 h-6 flex justify-center items-center dark:hover:bg-gray-600 dark:bg-gray-700 dark:hover:text-white border border-gray-300 dark:border-gray-600"
                            >
                              <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                              </svg>
                              <span className="sr-only">Remove image</span>
                            </button>
                          </div>
                        ) : (
                          <>
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg
                                className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 20 16"
                              >
                                <path
                                  stroke="currentColor"
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth="2"
                                  d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
                                />
                              </svg>
                              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                                <span className="font-semibold">Click to upload</span> or drag and
                                drop
                              </p>
                              <p className="text-xs text-gray-500 dark:text-gray-400">
                                SVG, PNG, JPG or GIF (MAX. 800x400px)
                              </p>
                            </div>
                            <input
                              id="image-upload"
                              type="file"
                              className="hidden"
                              accept="image/*"
                              onChange={handleFileChange}
                            />
                          </>
                        )}
                      </div>
                      {contact?.photo && (
                        <button
                          type="button"
                          className="text-red-500 dark:text-red-400 hover:underline"
                          onClick={() => setUploadNewImage(false)}
                        >
                          Cancel Upload New Image
                        </button>
                      )}
                    </>
                  ) : (
                    <div className="flex items-center justify-between">
                      <Image
                        className=""
                        width={200}
                        height={200}
                        src={contact?.photo || ''}
                        alt={contact?.name || ''}
                      />

                      <button
                        type="button"
                        className="text-blue-500 dark:text-blue-400 hover:underline"
                        onClick={() => setUploadNewImage(true)}
                      >
                        Upload New Image
                      </button>
                    </div>
                  )}
                </div>
              </div>

              <button
                type="submit"
                className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
              >
                {contact ? 'Update contact' : 'Add contact'}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default ReachUsContactAddUpdateModal;
