import React from "react";
import { ApplicationSelection } from "../ApplicationSelection";
import { LayoutDark } from "../Layout";
import { NavigationBar } from "../NavigationBar";

const HeroSection: React.FunctionComponent = () => {
  return (
    <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
      <div className="text-center">
        <img className="w-auto h-40 mx-auto my-6" src="/logo.svg" alt="" />
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-100 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">VEIL</span>
          <span className="block text-indigo-600 xl:inline">OS</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Operating System running privacy respecting applications
        </p>
      </div>
    </main>
  );
};

export const HomeContainer: React.FunctionComponent = () => {
  return (
    <LayoutDark>
      <NavigationBar />
      <HeroSection />
      <div className="mt-16 mx-auto max-w-7xl px-4">
        <ApplicationSelection />
      </div>
    </LayoutDark>
  );
};
