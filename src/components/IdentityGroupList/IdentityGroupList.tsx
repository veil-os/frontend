import React, { FunctionComponent } from "react";
import { Link } from "react-router-dom";

export interface IdentityGroupListProps {
  identityGroups: {
    identityGroup: string;
    name: string;
  }[];
}

export const IdentityGroupList: FunctionComponent<IdentityGroupListProps> = ({ identityGroups }) => {
  return (
    <div className="flex flex-col items-center">
      <div className="w-full">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Name
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                ID
              </th>
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {identityGroups.map((identityGroup, i) => (
              <tr className={i % 2 === 0 ? "bg-white" : "bg-gray-50"} key={i}>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{identityGroup.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{identityGroup.identityGroup}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <Link to={`group/${identityGroup.identityGroup}`}>
                    <div className="bg-gray-600 rounded-full border-gray-600 border-2 p-1 text-center text-gray-100">
                      Manage
                    </div>
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
