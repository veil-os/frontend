import React, { useState } from "react";
import Identicon from "react-jdenticon";
import { useIdentityGroupManagementContext } from "../../../common/context/IdentityGroupManagementContext";
import { insertIdentityCommitmentToGroup } from "../../../services/backend";
import { IdentityCommitment, SideEffectState } from "../../../types";
import { Loader } from "../../Loader";

export interface AddMembersModalProps {
  identityGroup: string;
  toggleModal: () => void;
  reloadMembers: () => void;
}

export const AddMembersModal: React.FunctionComponent<AddMembersModalProps> = ({
  identityGroup,
  toggleModal,
  reloadMembers,
}) => {
  const { managers } = useIdentityGroupManagementContext();
  const [identityCommitment, setIdentityCommitment] = useState("");
  const [addingState, setAddingState] = useState<SideEffectState<IdentityCommitment>>({ state: "UNINITIALIZED" });

  const managerKey = managers[identityGroup] ? managers[identityGroup].key : undefined;

  const handleAddMember = async () => {
    if (addingState.state === "PENDING") return;
    try {
      setAddingState({ state: "PENDING" });
      const data = await insertIdentityCommitmentToGroup({ identityGroup, identityCommitment }, managerKey);
      setAddingState({ state: "SUCCESS", data });
      reloadMembers();
      toggleModal();
    } catch (error) {
      setAddingState({ state: "ERROR", error });
    }
  };

  console.log(addingState);

  if (!managerKey)
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
              <div className="mt-3 text-center sm:mt-5">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                  Manager Key Missing
                </h3>
                <div className="text-sm my-2 text-gray-500">
                  To add new members, set the manager key for the group first.
                </div>
              </div>
            </div>
            <div className="mt-5 sm:mt-6">
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
              <Identicon size="72" value={identityCommitment} />
            </div>
            <div className="mt-3 text-center sm:mt-5">
              {addingState.state === "ERROR" && (
                <div className="bg-red-600 py-4 rounded-lg">
                  <h3 className="text-lg leading-6 font-medium text-gray-200" id="modal-headline">
                    Error
                  </h3>
                  <div className="text-sm my-2 text-white">{addingState.error.message}</div>
                </div>
              )}
              {addingState.state === "UNINITIALIZED" && (
                <>
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Add new identity
                  </h3>
                  <div className="text-sm my-2 text-gray-500">
                    To add a new user to the group, insert the identity of the user found in the VeilOS Identity Card.
                  </div>
                  <label
                    htmlFor="identity-commitment"
                    className="block text-sm font-medium text-gray-700 text-left mt-4"
                  >
                    Identity
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      value={identityCommitment}
                      onChange={(e) => setIdentityCommitment(e.target.value)}
                      name="identity-commitment"
                      id="identity-commitment"
                      className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </>
              )}
              {addingState.state === "PENDING" && (
                <>
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Adding user to group...
                  </h3>
                  <Loader />
                </>
              )}
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            {addingState.state === "UNINITIALIZED" && (
              <button
                type="button"
                onClick={handleAddMember}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Add User
              </button>
            )}
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
