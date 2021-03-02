import React, { useState } from "react";

export interface DebugProps {
  title?: string;
  children?: React.ReactNode;
}

export const Debug = ({ title, children }: DebugProps) => {
  const [isShown, setIsShown] = useState(true);
  const toggleIsShown = () => setIsShown(!isShown);
  return isShown ? (
    <div className="bg-yellow-200">
      <div className="float-right">
        <div className="bg-red-200 inline-block p-1 rounded-bl" onClick={toggleIsShown}>
          x
        </div>
      </div>

      <div className="px-4 py-5 sm:p-6">
        {title && (
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            <pre>{title}</pre>
          </h3>
        )}
        <div className="mt-2 max-w-xl text-sm text-gray-500">
          <pre>{children}</pre>
        </div>
      </div>
    </div>
  ) : null;
};
