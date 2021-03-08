import React from "react";
import { ClaimCard } from "../ClaimCard";
import { LayoutDark } from "../Layout";
import { NavigationBar } from "../NavigationBar";

export const ClaimContainer: React.FunctionComponent = () => {
  return (
    <LayoutDark>
      <NavigationBar />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block xl:inline">VEIL</span>
            <span className="block text-indigo-600 xl:inline">OS</span>
          </h2>
          <p className="mt-5 text-xl text-gray-400">
            Launch VeilApps by scanning a VeilApp QR code or enter the parameters manually
          </p>
        </div>
      </div>
      <div className="mx-auto max-w-7xl px-4">
        <ClaimCard />
      </div>
    </LayoutDark>
  );
};
