import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useIdentityGroupManagementContext } from "../../../common/context/IdentityGroupManagementContext";
import { createIdentityGroup } from "../../../services/backend";
import { IdentityGroupCreateResponse, SideEffectState } from "../../../types";
import { Loader } from "../../Loader";

export interface CreateGroupModalProps {
  toggleModal: () => void;
}

export const CreateGroupModal: React.FunctionComponent<CreateGroupModalProps> = ({ toggleModal }) => {
  const [name, setName] = useState("");
  const [createState, setCreateState] = useState<SideEffectState<IdentityGroupCreateResponse>>({
    state: "UNINITIALIZED",
  });
  const history = useHistory();
  const { setManager } = useIdentityGroupManagementContext();

  const handleGoToGroup = () => {
    if (createState.state !== "SUCCESS") return;
    history.push(`/group/${createState.data.identityGroup}`);
  };

  const handleCreateGroup = async () => {
    if (createState.state === "PENDING") return;
    try {
      setCreateState({ state: "PENDING" });
      const data = await createIdentityGroup({ name });
      setCreateState({ state: "SUCCESS", data });
      setManager(data.identityGroup, { key: data.key });
    } catch (error) {
      setCreateState({ state: "ERROR", error });
    }
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
            <div className="mt-3 text-center sm:mt-5">
              {createState.state === "ERROR" && (
                <div className="bg-red-600 py-4 mb-4 rounded-lg">
                  <h3 className="text-lg leading-6 font-medium text-gray-200" id="modal-headline">
                    Error
                  </h3>
                  <div className="text-sm my-2 text-white">{createState.error.message}</div>
                </div>
              )}
              {createState.state === "SUCCESS" && (
                <>
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Group Created
                  </h3>
                  <div className="text-sm my-2 text-gray-500">Congratulation, you've created your group!</div>
                  <div className="my-2 text-gray-50 bg-red-500 p-2 rounded">
                    Copy the management key below and save it in a secured location:
                  </div>
                  <label className="block text-sm font-medium text-gray-700 text-left mt-4">Management Key</label>
                  <div className="my-2 text-sm bg-green-200 p-2">{createState.data.key}</div>
                  <div className="mt-1 text-sm my-2 text-gray-500">
                    The management key is required to manage the group such as adding or deleting members from your
                    group. Anyone with the key is able to manage the group.
                  </div>
                </>
              )}
              {(createState.state === "UNINITIALIZED" || createState.state === "ERROR") && (
                <>
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Create New Group
                  </h3>
                  <div className="text-sm my-2 text-gray-500">
                    Create a new group of users. Users' activities in a group cannot be attributed back to the
                    individuals.
                  </div>
                  <label htmlFor="group-name" className="block text-sm font-medium text-gray-700 text-left mt-4">
                    Name
                  </label>
                  <div className="mt-1">
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      name="group-name"
                      id="group-name"
                      className="shadow-sm focus:ring-gray-500 focus:border-gray-500 block w-full sm:text-sm border-gray-300 rounded-md"
                    />
                  </div>
                </>
              )}
              {createState.state === "PENDING" && (
                <>
                  <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-headline">
                    Creating group...
                  </h3>
                  <Loader />
                </>
              )}
            </div>
          </div>
          <div className="mt-5 sm:mt-6">
            {createState.state === "UNINITIALIZED" && (
              <button
                type="button"
                onClick={handleCreateGroup}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Create Group
              </button>
            )}
            {createState.state === "SUCCESS" && (
              <button
                type="button"
                onClick={handleGoToGroup}
                className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
              >
                Manage Group
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
