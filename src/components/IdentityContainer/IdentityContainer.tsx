import React from "react";
import { useIdentityContext } from "../../common/context/IdentityContext";
import { IdentityCard } from "../IdentityCard";
import { LayoutDark } from "../Layout";
import { NavigationBar } from "../NavigationBar";

export const IdentityContainer: React.FunctionComponent = () => {
  const { identity, setIdentity } = useIdentityContext();

  const resetIdentity = () => {
    setIdentity(undefined);
  };

  return (
    <LayoutDark>
      <NavigationBar />
      <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:px-8 lg:flex lg:justify-between">
        <div className="max-w-xl">
          <h2 className="text-4xl font-extrabold text-white sm:text-5xl sm:tracking-tight lg:text-6xl">
            <span className="block xl:inline">VEIL</span>
            <span className="block text-indigo-600 xl:inline">ID</span>
          </h2>
          <p className="mt-5 text-xl text-gray-400">Privacy preserving identity for VeilApps</p>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <IdentityCard onResetIdentity={resetIdentity} onSetIdentity={setIdentity} identity={identity} />
      </div>
    </LayoutDark>
  );
};
