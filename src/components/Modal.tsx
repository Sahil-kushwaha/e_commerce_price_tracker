"use client";

import {
  Dialog,
} from "@headlessui/react";

import { useState } from "react";
import Image from "next/image";
import { addUserEmailToProduct } from "@/lib/action";

interface props {
    productId:string
}
function Modal({productId}:props) {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitting , setIsSubmitting] = useState(false);
  const [email,setEmail] = useState('')

  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleSubmit = async(e:FormEvent<HTMLFormElement>) =>{
      e.preventDefault();
      setIsSubmitting(true)
      
      await addUserEmailToProduct(productId ,email);

      setIsSubmitting(false)
      setEmail('')
      closeModal()
  }


  return (
    <>
      <button onClick={openModal} className="btn">
        Track
      </button>
      <Dialog open={isOpen} onClose={closeModal} className="dialog-container ">
        <div className="min-h-screen px-4 text-center">
          <span
            className="inline-block h-screen align-middle"
            aria-hidden="true"
          />

          <div className="  dark:bg-slate-900 dialog-content">
            <div className="flex flex-col">
              <div className="flex justify-between">
                <div className="p-3 border border-gray-200 rounded-10">
                  <Image
                    src="/assets/icons/logo.svg"
                    alt="logo"
                    width={28}
                    height={28}
                  />
                </div>
                <Image
                  src="/assets/icons/x-close.svg"
                  alt="closeModal"
                  width={24}
                  height={24}
                  className="cursor-pointer"
                  onClick={closeModal}
                />
              </div>

              <h4 className="dialog-head_text dark:text-gray-500">
                Stay updated with product pricing alerts right in your inbox!
              </h4>

              <p className="text-sm text-slate-400 mt-2">
                Never miss a bargain again with our timely alerts!
              </p>

              <form onSubmit={handleSubmit} className="flex flex-col mt-5">
                <label
                  htmlFor="email"
                  className="text-sm font-medium text-gray-100"
                >
                  Email Address
                </label>
                <div className="dialog-input_container">
                  <Image
                    src="/assets/icons/mail.svg"
                    alt="mail_logo"
                    width={18}
                    height={18}
                  />
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    required
                    placeholder="Enter your email address"
                    className="dialog-input bg-inherit"
                  />
                </div>
                <button type="submit" className="dialog-btn dark:bg-slate-200 dark:text-black">
                  {isSubmitting?"Submitting...": "Track"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Modal;
