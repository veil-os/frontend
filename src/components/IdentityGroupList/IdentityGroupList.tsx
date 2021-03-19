import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { ButtonLg } from "../Button";

export interface IdentityGroupProps {
  identityGroup: string;
  name: string;
}

export const IdentityGroup: FunctionComponent<IdentityGroupProps> = ({ name, identityGroup }) => {
  return (
    <li className="py-4">
      <Link to={`identityGroup/${identityGroup}`}>
        <div className="flex items-center space-x-4">
          <div className="flex-1 min-w-0">
            <p className="text-lg font-medium text-gray-100 truncate">{name}</p>
            <p className="text-sm text-gray-400">{identityGroup}</p>
          </div>
          <div>
            <a
              href="#"
              className="inline-flex items-center shadow-sm px-2.5 py-0.5 border border-gray-300 text-sm leading-5 font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50"
            >
              Manage
            </a>
          </div>
        </div>
      </Link>
    </li>
  );
};

export interface IdentityGroupListProps {
  identityGroups: IdentityGroupProps[];
}

export const IdentityGroupList: FunctionComponent<IdentityGroupListProps> = ({ identityGroups }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <div className="flow-root mt-6 w-full">
          <ul className="-my-5 divide-y divide-gray-600">
            {identityGroups.map((identityGroup, i) => (
              <IdentityGroup key={i} {...identityGroup} />
            ))}
          </ul>
        </div>
        <div className="my-6 text-right">
          <ButtonLg>Create New Identity Group</ButtonLg>
        </div>
      </div>
    </div>
  );
};
