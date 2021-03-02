import React from "react";

export interface ButtonProps {
  onClick?: () => void;
}

export const ButtonXs: React.FunctionComponent<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {children}
    </button>
  );
};

export const ButtonSm: React.FunctionComponent<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {children}
    </button>
  );
};

export const Button: React.FunctionComponent<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {children}
    </button>
  );
};

export const ButtonXl: React.FunctionComponent<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {children}
    </button>
  );
};

export const ButtonLg: React.FunctionComponent<ButtonProps> = ({ children, onClick }) => {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gray-600 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
    >
      {children}
    </button>
  );
};
