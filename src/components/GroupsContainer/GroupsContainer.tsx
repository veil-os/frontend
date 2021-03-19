import React, { FunctionComponent, useEffect, useState } from "react";
import { listIdentityGroups } from "../../services/backend";
import { IdentityGroups } from "../../types";
import { LayoutDark } from "../Layout";
import { NavigationBar } from "../NavigationBar";
import { IdentityGroupList } from "../IdentityGroupList";

interface UninitializedState {
  state: "UNINITIALIZED";
}

interface FetchingState {
  state: "FETCHING";
}

interface SuccessState {
  state: "SUCCESS";
  identityGroups: IdentityGroups;
}

interface ErrorState {
  state: "ERROR";
  error: Error;
}

type IdentityGroupsListState = UninitializedState | FetchingState | SuccessState | ErrorState;

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

export const GroupsContainer: React.FunctionComponent = () => {
  const [state, setState] = useState<IdentityGroupsListState>({ state: "UNINITIALIZED" });
  const loadIdentityGroup = async () => {
    try {
      const identityGroups = await listIdentityGroups();
      setState({
        state: "SUCCESS",
        identityGroups,
      });
    } catch (error) {
      setState({
        state: "ERROR",
        error,
      });
    }
  };
  useEffect(() => {
    if (state.state === "UNINITIALIZED") loadIdentityGroup();
  }, [state, loadIdentityGroup]);

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
        <div className="text-white text-2xl mt-6 mb-2">Groups</div>
        {state.state === "FETCHING" || (state.state === "UNINITIALIZED" && <Loader />)}
        {state.state === "SUCCESS" && <IdentityGroupList identityGroups={state.identityGroups} />}
      </div>
    </LayoutDark>
  );
};
