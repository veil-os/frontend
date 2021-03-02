import React from "react";
import { IdentityGroupList, IdentityGroupListProps } from ".";

export default {
  title: "IdentityGroupList",
  component: IdentityGroupList,
  parameters: {
    info: { inline: true, header: false },
  },
};

const props: IdentityGroupListProps = {
  identityGroups: [
    {
      name: "Group 1",
      identityGroup: "34bca226-b083-4527-9083-1cfd9dea3935",
    },
    {
      name: "Group 1",
      identityGroup: "34bca226-b083-4527-9083-1cfd9dea3935",
    },
    {
      name: "Group 1",
      identityGroup: "34bca226-b083-4527-9083-1cfd9dea3935",
    },
    {
      name: "Group 1",
      identityGroup: "34bca226-b083-4527-9083-1cfd9dea3935",
    },
    {
      name: "Group 1",
      identityGroup: "34bca226-b083-4527-9083-1cfd9dea3935",
    },
  ],
};

export const IdentityGroupListStory: React.FunctionComponent = () => (
  <div>
    <h1 className="storybook-title">IdentityGroupList</h1>
    <IdentityGroupList {...props} />
  </div>
);
