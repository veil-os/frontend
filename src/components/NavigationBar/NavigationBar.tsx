import React, { useState } from "react";
import { Link } from "react-router-dom";

export const NavigationBar: React.FunctionComponent = () => {
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const toggleShowMobileMenu = () => setShowMobileMenu(!showMobileMenu);
  return (
    <>
      <nav className="relative max-w-7xl mx-auto flex items-center justify-between px-4 sm:px-6" aria-label="Global">
        <div className="flex items-center flex-1">
          <div className="flex items-center justify-between w-full md:w-auto">
            <Link to="/">
              <span className="sr-only">Workflow</span>
              <img
                className="h-8 w-auto sm:h-10"
                src="https://tailwindui.com/img/logos/workflow-mark-indigo-500.svg"
                alt=""
              />
            </Link>
            <div className="-mr-2 flex items-center md:hidden">
              <button
                type="button"
                className="bg-gray-800 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-700 focus:outline-none focus:ring-2 focus-ring-inset focus:ring-white"
                id="main-menu"
                aria-haspopup="true"
                onClick={toggleShowMobileMenu}
              >
                <span className="sr-only">Open main menu</span>
                {/* Heroicon name: outline/menu */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
          <div className="hidden space-x-10 md:flex md:ml-10">
            <a href="#" className="font-medium text-white hover:text-gray-300">
              Product
            </a>
            <a href="#" className="font-medium text-white hover:text-gray-300">
              Features
            </a>
            <a href="#" className="font-medium text-white hover:text-gray-300">
              Marketplace
            </a>
            <a href="#" className="font-medium text-white hover:text-gray-300">
              Company
            </a>
          </div>
        </div>
        <div className="hidden md:flex">
          <Link
            to="/identity"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-gray-600 hover:bg-gray-700"
          >
            Identity
          </Link>
        </div>
      </nav>
      {/*
  Mobile menu, show/hide based on menu open state.
  
  Entering: "duration-150 ease-out"
  From: "opacity-0 scale-95"
  To: "opacity-100 scale-100"
  Leaving: "duration-100 ease-in"
  From: "opacity-100 scale-100"
  To: "opacity-0 scale-95"
  */}
      <div
        className={`absolute top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden ${
          showMobileMenu ? "" : "hidden"
        }`}
      >
        <div className="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
          <div className="px-5 pt-4 flex items-center justify-between">
            <div>
              <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="" />
            </div>
            <div className="-mr-2">
              <button
                type="button"
                className="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                onClick={toggleShowMobileMenu}
              >
                <span className="sr-only">Close menu</span>
                {/* Heroicon name: outline/x */}
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>
          <div role="menu" aria-orientation="vertical" aria-labelledby="main-menu">
            <div className="px-2 pt-2 pb-3 space-y-1" role="none">
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                role="menuitem"
              >
                Product
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                role="menuitem"
              >
                Features
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                role="menuitem"
              >
                Marketplace
              </a>
              <a
                href="#"
                className="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50"
                role="menuitem"
              >
                Company
              </a>
            </div>
            <div role="none">
              <a
                href="#"
                className="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100"
                role="menuitem"
              >
                Log in
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
