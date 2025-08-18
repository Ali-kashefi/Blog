'use client';
import React from "react";
import ReactDOM from "react-dom";
function Drawer({ open, onclose, children }) {
  return  ReactDOM.createPortal (
    <>
      <div
        className={`backdrop-blur-sm fixed inset-0 w-full h-screen bg-secondary-800 bg-opacity-30 
        ${open ? "block" : " pointer-events-none hidden"}
        `}
        onClick={onclose}
      ></div>
      <div
        className={`fixed top-0 right-0 w-[250px] h-full transition-transform ${
          open ? "translate-x-0" : "translate-x-full "
        }`}
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
        }}
      >
        <div className="bg-secondary-0 max-h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}

export default Drawer;
