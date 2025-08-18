import React from "react";
import { createPortal } from "react-dom";
import ButtonIcon from "./ButtonIcon";
import { CheckBadgeIcon } from "@heroicons/react/24/solid";
import { XMarkIcon } from "@heroicons/react/24/outline";

function ShowImageModal({ open, children, onClose,save }) {
  return (
    open &&
    createPortal(
      <div
        className="backdrop-blur-sm fixed top-0 left-0 w-full h-screen bg-secondary-800 bg-opacity-30 z-50 flex items-center justify-center"
       
      >
        <div
          className="relative rounded-lg bg-white shadow-lg transition-all duration-500 ease-out w-[60%] max-h-[calc(100vh-2rem)] overflow-hidden"
          onClick={(e) => e.stopPropagation()} 
        >
        
          <div className="absolute top-0 left-0 w-full bg-white p-4 rounded-t-lg border-b border-secondary-300 flex items-center justify-between z-10">
            <ButtonIcon onClick={save} variant="secondary" className="text-green-500">
              <CheckBadgeIcon className="w-6 h-6" />
            </ButtonIcon>
            <p className="text-secondary-700 font-bold text-base text-center">
              عکس انتخاب شده
            </p>
            <ButtonIcon variant="red" className="text-red-500" onClick={onClose}>
              <XMarkIcon className="w-6 h-6" />
            </ButtonIcon>
          </div>

      
          <div className="relative mt-16 w-full h-[500px] bg-secondary-100 flex items-center justify-center overflow-hidden rounded-b-lg">
            {children}
          </div>
        </div>
      </div>,
      document.body
    )
  );
}

export default ShowImageModal;
