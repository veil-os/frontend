import React, { useState } from "react";
import { useIdentityGroupManagementContext } from "../../../common/context/IdentityGroupManagementContext";

export interface IdentityGroupManagerModalProps {
  identityGroup: string;
  toggleModal: () => void;
}

export const IdentityGroupManagerModal: React.FunctionComponent<IdentityGroupManagerModalProps> = ({
  identityGroup,
  toggleModal,
}) => {
  const { managers, setManager } = useIdentityGroupManagementContext();
  const [localManagerKey, setLocalManagerKey] = useState(managers[identityGroup] ? managers[identityGroup].key : "");

  const saveManagerKey = async () => {
    // TODO validate key with server
    setManager(identityGroup, { key: localManagerKey });
    toggleModal();
  };

  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" onClick={toggleModal} />
        </div>
        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true" />
        <div
          className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-sm sm:w-full sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div>
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6 text-green-600"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                />
              </svg>
            </div>
            <div className="mt-3 text-center sm:mt-5">
              <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                Group Management Key
              </h3>
              <div className="text-sm my-2 text-gray-500">
                A management key is needed to make changes to manage the identity group, it is shown when the identity
                group is being created. Insert it below to enable management of the identity group.
              </div>
              <label htmlFor="management-key" className="block text-sm font-medium text-gray-700 text-left mt-4">
                Management Key
              </label>
              <div className="mt-1">
                <input
                  type="text"
                  value={localManagerKey}
                  onChange={(e) => setLocalManagerKey(e.target.value)}
                  name="management-key"
                  id="management-key"
                  className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                />
              </div>
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              onClick={saveManagerKey}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Save
            </button>
            <button
              type="button"
              onClick={toggleModal}
              className="mt-2 inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
