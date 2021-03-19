import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import Identicon from "react-jdenticon";
import { useParams } from "react-router";
import { getIdentityCommitmentByGroup, getIdentityGroupInfo } from "../../services/backend";
import { IdentityCommitments, IdentityGroup } from "../../types";
import { LayoutDark } from "../Layout";
import { NavigationBar } from "../NavigationBar";

interface UninitializedIdentitiesState {
  state: "UNINITIALIZED";
}

interface FetchingIdentitiesState {
  state: "FETCHING";
}

interface SuccessIdentitiesState {
  state: "SUCCESS";
  identityCommitments: IdentityCommitments;
}

interface ErrorIdentitiesState {
  state: "ERROR";
  error: Error;
}

type IdentityGroupsIdentitiesState =
  | UninitializedIdentitiesState
  | FetchingIdentitiesState
  | SuccessIdentitiesState
  | ErrorIdentitiesState;

interface UninitializedInfoState {
  state: "UNINITIALIZED";
}

interface FetchingInfoState {
  state: "FETCHING";
}

interface SuccessInfoState {
  state: "SUCCESS";
  identityGroup: IdentityGroup;
}

interface ErrorInfoState {
  state: "ERROR";
  error: Error;
}

type IdentityGroupsInfoState = UninitializedInfoState | FetchingInfoState | SuccessInfoState | ErrorInfoState;

export const Loader: FunctionComponent = () => {
  return (
    <div className="px-4 py-5 sm:p-6 flex place-content-center animate-spin">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-40 p-4 text-gray-300">
        <path fill="none" d="M0 0h24v24H0z" />
        <path d="M12 3a9 9 0 0 1 9 9h-2a7 7 0 0 0-7-7V3z" fill="currentColor" />
      </svg>
    </div>
  );
};

export const ManageGroupContainer: React.FunctionComponent = () => {
  const { identityGroup } = useParams<{ identityGroup: string }>();
  const [identityState, setIdentityState] = useState<IdentityGroupsIdentitiesState>({ state: "UNINITIALIZED" });
  const [infoState, setInfoState] = useState<IdentityGroupsInfoState>({ state: "UNINITIALIZED" });

  const loadIdentityCommitments = useCallback(async () => {
    try {
      const identityCommitments = await getIdentityCommitmentByGroup({ identityGroup });
      setIdentityState({
        state: "SUCCESS",
        identityCommitments,
      });
    } catch (error) {
      setIdentityState({
        state: "ERROR",
        error,
      });
    }
  }, [identityGroup]);

  const loadInfo = useCallback(async () => {
    try {
      const info = await getIdentityGroupInfo({ identityGroup });
      setInfoState({
        state: "SUCCESS",
        identityGroup: info,
      });
    } catch (error) {
      setInfoState({
        state: "ERROR",
        error,
      });
    }
  }, [identityGroup]);
  useEffect(() => {
    if (identityState.state === "UNINITIALIZED") {
      loadIdentityCommitments();
      loadInfo();
    }
  }, [identityState, loadIdentityCommitments, identityGroup, loadInfo]);

  return (
    <LayoutDark>
      <NavigationBar />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block xl:inline">VEIL</span>
            <span className="block text-indigo-600 xl:inline">GROUPS</span>
          </h2>
          <p className="mt-5 text-xl text-gray-400">Manage groups of users</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 ">
        <div className="text-white text-2xl mt-6 mb-2">Group Information</div>
        <div className="bg-white p-4 my-2">
          {infoState.state === "UNINITIALIZED" || (infoState.state === "FETCHING" && <Loader />)}
          {infoState.state === "SUCCESS" && (
            <>
              <div className="text-xl text-gray-800">{infoState.identityGroup.name}</div>
              <div className="text-gray-500">{infoState.identityGroup.identityGroup}</div>
            </>
          )}
        </div>
        <div className="text-white text-2xl mt-6 mb-2">Members</div>
        {identityState.state === "UNINITIALIZED" || (identityState.state === "FETCHING" && <Loader />)}
        {identityState.state === "SUCCESS" && (
          <IdentityCommitmentList identityCommitments={identityState.identityCommitments} />
        )}
      </div>
    </LayoutDark>
  );
};

export interface IdentityCommitmentListProps {
  identityCommitments: IdentityCommitments;
}

export const IdentityCommitmentList: FunctionComponent<IdentityCommitmentListProps> = ({ identityCommitments }) => {
  return (
    <div className="w-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Name
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              ID
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {identityCommitments.map(({ identityCommitment }, i) => (
            <tr className={i % 2 === 0 ? "bg-white" : "bg-gray-50"} key={i}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <Identicon size="72" value={identityCommitment} />
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{identityCommitment}</td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div
                  className="bg-gray-600 rounded-full border-gray-600 border-2 p-1 text-center text-gray-100 cursor-pointer"
                  onClick={() => alert("Coming soon!")}
                >
                  Delete
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};
