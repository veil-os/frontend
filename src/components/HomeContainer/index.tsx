import React from "react";
import { ApplicationSelection } from "../ApplicationSelection";
import { LayoutDark } from "../Layout";
import { NavigationBar } from "../NavigationBar";

const HeroSection: React.FunctionComponent = () => {
  return (
    <main className="mt-16 mx-auto max-w-7xl px-4 sm:mt-24">
      <div className="text-center">
        <h1 className="text-4xl tracking-tight font-extrabold text-gray-100 sm:text-5xl md:text-6xl">
          <span className="block xl:inline">VEIL</span>
          <span className="block text-indigo-600 xl:inline">OS</span>
        </h1>
        <p className="mt-3 max-w-md mx-auto text-base text-gray-300 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
          Operating System running privacy respecting applications
        </p>
        <div className="mt-5 max-w-md mx-auto sm:flex sm:justify-center md:mt-8">
          <div className="rounded-md shadow">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 md:py-4 md:text-lg md:px-10"
            >
              Get started
            </a>
          </div>
          <div className="mt-3 rounded-md shadow sm:mt-0 sm:ml-3">
            <a
              href="#"
              className="w-full flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:bg-gray-50 md:py-4 md:text-lg md:px-10"
            >
              Live demo
            </a>
          </div>
        </div>
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
