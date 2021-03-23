import React, { FunctionComponent } from "react";

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
