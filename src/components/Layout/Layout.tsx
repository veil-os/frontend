import React from "react";

export const LayoutDark: React.FunctionComponent = ({ children }) => {
  return (
    <div className="relative bg-gray-800 overflow-hidden min-h-screen">
      <div className="relative pt-6 pb-16 sm:pb-24">{children}</div>
    </div>
  );
};
