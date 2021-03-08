import React from "react";
import { CreateApplicationSelection } from "../CreateApplicationSelection";
import { LayoutDark } from "../Layout";
import { NavigationBar } from "../NavigationBar";

export const CreateContainer: React.FunctionComponent = () => {
  return (
    <LayoutDark>
      <NavigationBar />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block xl:inline">VEIL</span>
            <span className="block text-indigo-600 xl:inline">APPS</span>
          </h2>
          <p className="mt-5 text-xl text-gray-400">Launch apps which makes use of existing identity groups</p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <CreateApplicationSelection />
      </div>
    </LayoutDark>
  );
};
