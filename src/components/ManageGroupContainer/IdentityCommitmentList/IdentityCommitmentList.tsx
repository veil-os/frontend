import React, { FunctionComponent, useState } from "react";
import Identicon from "react-jdenticon";
import { useIdentityGroupManagementContext } from "../../../common/context/IdentityGroupManagementContext";
import { deleteIdentityCommitmentFromGroup } from "../../../services/backend";
import { IdentityCommitments, SideEffectState } from "../../../types";

export interface IdentityCommitmentListProps {
  identityCommitments: IdentityCommitments;
  identityGroup: string;
  reloadMembers: () => void;
}

export const IdentityCommitmentList: FunctionComponent<IdentityCommitmentListProps> = ({
  identityCommitments,
  identityGroup,
  reloadMembers,
}) => {
  const { managers } = useIdentityGroupManagementContext();
  const managerKey = managers[identityGroup] ? managers[identityGroup].key : undefined;
  const [deleteState, setDeleteState] = useState<SideEffectState<undefined>>({ state: "UNINITIALIZED" });

  const deleteIdentityCommitment = async (identityCommitment: string) => {
    try {
      setDeleteState({ state: "PENDING" });
      await deleteIdentityCommitmentFromGroup({ identityCommitment, identityGroup }, managerKey);
      reloadMembers();
      setDeleteState({ state: "UNINITIALIZED" });
    } catch (error) {
      setDeleteState({ state: "ERROR", error });
    }
  };

  return (
    <div className="w-full">
      {deleteState.state === "ERROR" && (
        <div className="p-4 bg-red-600">
          <h3 className="text-gray-100 text-lg">Error Deleting Member</h3>
          <p className="text-gray-200">{deleteState.error.message}</p>
        </div>
      )}
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            {managerKey && (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {identityCommitments.map(({ identityCommitment }, i) => (
            <tr className={i % 2 === 0 ? "bg-white" : "bg-gray-50"} key={i}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Identicon size="72" value={identityCommitment} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{identityCommitment}</td>
              {managerKey && deleteState.state !== "PENDING" && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div
                    className="bg-gray-600 rounded-full border-gray-600 border-2 p-1 text-center text-gray-100 cursor-pointer"
                    onClick={() => deleteIdentityCommitment(identityCommitment)}
                  >
                    Delete
                  </div>
                </td>
              )}
              {deleteState.state === "PENDING" && (
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="bg-gray-600 rounded-full border-gray-600 border-2 p-1 text-center text-gray-100 cursor-pointer">
                    <div className="p-1 flex place-content-center animate-spin">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-4 h-4 text-gray-100">
                        <path fill="none" d="M0 0h24v24H0z" />
                        <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" fill="currentColor" />
                      </svg>
                    </div>
                  </div>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
