import React, { FunctionComponent, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router";
import { getIdentityCommitmentByGroup, getIdentityGroupInfo } from "../../services/backend";
import { IdentityCommitments, IdentityGroup, SideEffectState } from "../../types";
import { LayoutDark } from "../Layout";
import { NavigationBar } from "../NavigationBar";
import { AddMembersModal } from "./AddMembersModal";
import { IdentityCommitmentList } from "./IdentityCommitmentList";
import { IdentityGroupManagerModal } from "./IdentityGroupManagerModal";

type IdentityGroupsIdentitiesState = SideEffectState<IdentityCommitments>;
type IdentityGroupsInfoState = SideEffectState<IdentityGroup>;

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
  const [showIdentityManagementModal, setShowIdentityManagementModal] = useState(false);
  const [showAddMembersModal, setShowAddMembersModal] = useState(false);
  const [identityState, setIdentityState] = useState<IdentityGroupsIdentitiesState>({ state: "UNINITIALIZED" });
  const [infoState, setInfoState] = useState<IdentityGroupsInfoState>({ state: "UNINITIALIZED" });

  const toggleIdentityManagementModal = () => setShowIdentityManagementModal(!showIdentityManagementModal);
  const toggleAddMembersModal = () => setShowAddMembersModal(!showAddMembersModal);

  const loadIdentityCommitments = useCallback(async () => {
    try {
      const identityCommitments = await getIdentityCommitmentByGroup({ identityGroup });
      setIdentityState({
        state: "SUCCESS",
        data: identityCommitments,
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
        data: info,
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
          {infoState.state === "UNINITIALIZED" || (infoState.state === "PENDING" && <Loader />)}
          {infoState.state === "SUCCESS" && (
            <div className="flex">
              <div className="flex-1">
                <div className="text-xl text-gray-800">{infoState.data.name}</div>
                <div className="text-gray-500">{infoState.data.identityGroup}</div>
              </div>
              <div
                className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100"
                onClick={toggleIdentityManagementModal}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="h-6 w-6 text-gray-600"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>
        <div className="text-white text-2xl mt-6 mb-2 flex items-center justify-between">
          <div>Members</div>
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-8 h-8 cursor-pointer"
              onClick={toggleAddMembersModal}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
        </div>
        {identityState.state === "UNINITIALIZED" || (identityState.state === "PENDING" && <Loader />)}
        {identityState.state === "SUCCESS" && (
          <IdentityCommitmentList
            identityCommitments={identityState.data}
            identityGroup={identityGroup}
            reloadMembers={loadIdentityCommitments}
          />
        )}
      </div>
      {showIdentityManagementModal && (
        <IdentityGroupManagerModal identityGroup={identityGroup} toggleModal={toggleIdentityManagementModal} />
      )}
      {showAddMembersModal && (
        <AddMembersModal
          identityGroup={identityGroup}
          toggleModal={toggleAddMembersModal}
          reloadMembers={loadIdentityCommitments}
        />
      )}
    </LayoutDark>
  );
};
