import React, { useState } from "react";
import { config } from "../../config";
import { ButtonLg } from "../Button";
import { DistributionDashboard } from "../DistributionDashboard";
import { LayoutDark } from "../Layout";
import { NavigationBar } from "../NavigationBar";

const { DEFAULT_EXTERNAL_NULLIFIER, DEFAULT_IDENTITY_GROUP, DEFAULT_MESSAGE } = config.defaults;

interface VoucherFormProps {
  externalNullifier: string;
  message: string;
  identityGroup: string;
  setExternalNullifier: (_val: string) => void;
  setMessage: (_val: string) => void;
  setIdentityGroup: (_val: string) => void;
  submitDistributionForm: () => void;
}

export const VoucherForm: React.FunctionComponent<VoucherFormProps> = ({
  message,
  externalNullifier,
  identityGroup,
  setExternalNullifier,
  setIdentityGroup,
  setMessage,
  submitDistributionForm,
}) => {
  return (
    <div>
      <ul className="grid grid-cols-1 gap-6 md:grid-cols-3">
        <li className="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200">
          <div className="flex-1 flex flex-col p-8">
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
                d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
              />
            </svg>
            <h3 className="mt-4 text-gray-900 text-lg font-medium">Identity Group ID</h3>
            <dd className="text-gray-500 text-sm mb-6 max-w-xs m-auto">
              Group ID of users who can generate these vouchers.
            </dd>
          </div>
        </li>
        <li className="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200">
          <div className="flex-1 flex flex-col p-8">
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
            <h3 className="mt-4 text-gray-900 text-lg font-medium">Topic</h3>
            <dd className="text-gray-500 text-sm mb-6 max-w-xs m-auto">
              Users may submit only one voucher per topic (prevents multiple submission).
            </dd>
          </div>
        </li>
        <li className="col-span-1 flex flex-col text-center bg-white rounded-md shadow divide-y divide-gray-200">
          <div className="flex-1 flex flex-col p-8">
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
                d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
              />
            </svg>
            <h3 className="mt-4 text-gray-900 text-lg font-medium">Message</h3>
            <dd className="text-gray-500 text-sm mb-6 max-w-xs m-auto">
              Additional annotation on the voucher. You may use it to distinguish different vouchers of the same topic.
            </dd>
          </div>
        </li>
      </ul>
      <div className="my-4">
        <label htmlFor="identity-group" className="block text-sm font-medium text-gray-200">
          Identity Group ID
        </label>
        <div className="mt-1">
          <input
            value={identityGroup}
            onChange={(e) => setIdentityGroup(e.target.value)}
            type="text"
            name="identity-group"
            id="identity-group"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="my-4">
        <label htmlFor="identity-group" className="block text-sm font-medium text-gray-200">
          Topic
        </label>
        <div className="mt-1">
          <input
            value={externalNullifier}
            onChange={(e) => setExternalNullifier(e.target.value)}
            type="text"
            name="identity-group"
            id="identity-group"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <div className="my-4">
        <label htmlFor="identity-group" className="block text-sm font-medium text-gray-200">
          Message
        </label>
        <div className="mt-1">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            type="text"
            name="identity-group"
            id="identity-group"
            className="focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm border-gray-300 rounded-md"
          />
        </div>
      </div>
      <ButtonLg onClick={submitDistributionForm}>Go To Dashboard</ButtonLg>
    </div>
  );
};

export const DistributeContainer: React.FunctionComponent = () => {
  const [identityGroup, setIdentityGroup] = useState(DEFAULT_IDENTITY_GROUP);
  const [message, setMessage] = useState(DEFAULT_MESSAGE);
  const [externalNullifier, setExternalNullifier] = useState(DEFAULT_EXTERNAL_NULLIFIER);
  const [showForm, setShowForm] = useState(true);

  const submitDistributionForm = () => {
    setShowForm(false);
  };

  const renderedComponent = showForm ? (
    <VoucherForm
      {...{
        identityGroup,
        message,
        externalNullifier,
        setMessage,
        setIdentityGroup,
        setExternalNullifier,
        submitDistributionForm,
      }}
    />
  ) : (
    <DistributionDashboard
      onBack={() => setShowForm(true)}
      identityGroup={identityGroup}
      message={message}
      externalNullifier={externalNullifier}
      loadResults={!showForm}
    />
  );

  return (
    <LayoutDark>
      <NavigationBar />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block xl:inline">VEIL</span>
            <span className="block text-indigo-600 xl:inline">VOUCHER</span>
          </h2>
          <p className="mt-5 text-xl text-gray-400">Coordinate distribution of goods, services &amp; rights</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{renderedComponent}</div>
    </LayoutDark>
  );
};
