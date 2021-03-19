import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export const ApplicationSelection: FunctionComponent = () => {
  return (
    <ul className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      <li className="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200">
        <Link to="identity">
          <div className="flex-1 flex flex-col p-8">
            <h3 className="mt-4 text-gray-900 text-lg font-medium">Manage Identity</h3>
            <dd className="text-gray-500 text-sm mb-6">Create, backup or delete identity profile</dd>
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
                d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"
              />
            </svg>
          </div>
        </Link>
      </li>
      <li className="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200">
        <Link to="claim">
          <div className="flex-1 flex flex-col p-8">
            <h3 className="mt-4 text-gray-900 text-lg font-medium">Access VEIL apps</h3>
            <dd className="text-gray-500 text-sm mb-6">Generate vouchers, votes, etc</dd>
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
        </Link>
      </li>
      <li className="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200">
        <Link to="create">
          <div className="flex-1 flex flex-col p-8">
            <h3 className="mt-4 text-gray-900 text-lg font-medium">Create VEIL apps</h3>
            <dd className="text-gray-500 text-sm mb-6">Create new vouchers, votes, etc</dd>
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
                d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
              />
            </svg>
          </div>
        </Link>
      </li>
      <li className="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200">
        <Link to="groups">
          <div className="flex-1 flex flex-col p-8">
            <h3 className="mt-4 text-gray-900 text-lg font-medium">Manage Groups</h3>
            <dd className="text-gray-500 text-sm mb-6">Update group and membership</dd>
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
                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
              />
            </svg>
          </div>
        </Link>
      </li>
    </ul>
  );
};
