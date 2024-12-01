"use client"
import React, { useState } from 'react';
import { addReachUsContact, updateReachUsContact } from '@/services/reachus.service';
import {  IContact } from '@/interfaces/IContacts';

function ReachUsContactAddUpdateModal({
  contact,
  onAddUpdatecontact,
  onClose,
}: {
  contact?: IContact,
  onAddUpdatecontact: () => void,
  onClose: () => void
}) {

  const [contactName, setcontactName] = useState(contact?.name || '');
  const [contactEmail, setcontactEmail] = useState(contact?.email || '');
  const [contactTelContact, setcontactTelContact] = useState(contact?.contact || '');
  const [contactPost, setcontactPost] = useState(contact?.post || ''); 

  // Toggle modal visibility
  const toggleModal = () => {
    setcontactName('');
    setcontactEmail('');
    setcontactTelContact('');
    setcontactPost('');
    onClose();    

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
    const contactTelRegex = /^\d{10}$/;
    if (!contactTelRegex.test(contactTelContact)) {
      alert('Invalid contact number');
      return;
    }

    try {
      const contactData = {
          name: contactName,
          email: contactEmail,
          contact: contactTelContact,
          post : contactPost
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
                  {contact ? "Update contact" : "Add contact"}
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
                    <label htmlFor="contactName" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">contact Name</label>
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
                  <label htmlFor="contactEmail" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">contact Name</label>
                    <input 
                      type="text" 
                      name="contactEmail" 
                      id="contactEmail" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="Type contact name" 
                      required 
                      value={contactEmail}
                      onChange={(e) => setcontactEmail(e.target.value)}
                    />
                  </div>

                  <div>
                  <label htmlFor="contactTelContact" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">contact Name</label>
                    <input 
                      type="text" 
                      name="contactTelContact" 
                      id="contactTelContact" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="Type contact name" 
                      required 
                      value={contactTelContact}
                      onChange={(e) => setcontactTelContact(e.target.value)}
                    />
                  </div>

                  <div>
                  <label htmlFor="contactPost" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">contact Name</label>
                    <input 
                      type="text" 
                      name="contactPost" 
                      id="contactPost" 
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white" 
                      placeholder="Type contact name" 
                      required 
                      value={contactPost}
                      onChange={(e) => setcontactPost(e.target.value)}
                    />
                  </div>
                  </div>


                  <button
                    type="submit"
                    className="block text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full"
                  >
                    {contact ? "Update contact" : "Add contact"}
                  </button>
                </form>
              </div>
          
            </div>
          </div>
      </>
    );
  }

  export default ReachUsContactAddUpdateModal;