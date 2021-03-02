import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const CreateApplicationSelection: FunctionComponent = () => {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
      <li className="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200">
        <Link to="distribute">
          <div className="flex-1 flex flex-col p-8">
            <h3 className="mt-4 text-gray-900 text-lg font-medium">Voucher</h3>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-48 m-auto text-gray-200"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
              />
            </svg>
          </div>
          <button
            type="button"
            className="mb-8 inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Create Voucher
          </button>
        </Link>
      </li>
      <li className="col-span-1 flex flex-col text-center bg-gray-400 rounded-md shadow">
        <div className="flex-1 flex flex-col p-8">
          <h3 className="mt-4 text-gray-900 text-lg font-medium">Vote</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-48 m-auto text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"
            />
          </svg>
        </div>
        <div className="text-center font-medium text-gray-700 mb-8 px-4 py-2">Coming Soon...</div>
      </li>
      <li className="col-span-1 flex flex-col text-center bg-gray-400 rounded-md shadow">
        <div className="flex-1 flex flex-col p-8">
          <h3 className="mt-4 text-gray-900 text-lg font-medium">Quadratic Vote</h3>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            className="w-48 m-auto text-gray-600"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 10h18M3 14h18m-9-4v8m-7 0h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          </svg>
        </div>
        <div className="text-center font-medium text-gray-700 mb-8 px-4 py-2">Coming Soon...</div>
      </li>
    </ul>
  );
};
