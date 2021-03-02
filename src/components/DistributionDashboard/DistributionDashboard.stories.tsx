import React from "react";
import { config } from "../../config";
import { DistributionDashboard } from ".";

const { DEFAULT_EXTERNAL_NULLIFIER, DEFAULT_IDENTITY_GROUP, DEFAULT_MESSAGE } = config.defaults;

export default {
  title: "DistributionDashboard",
  component: DistributionDashboard,
  parameters: {
    info: { inline: true, header: false },
  },
};

export const DistributionDashboardStory: React.FunctionComponent = () => (
  <div>
    <h1 className="storybook-title">DistributionDashboard</h1>
    <DistributionDashboard
      identityGroup={DEFAULT_IDENTITY_GROUP}
      message={DEFAULT_MESSAGE}
      externalNullifier={DEFAULT_EXTERNAL_NULLIFIER}
      loadResults={false}
      onBack={() => alert("Back")}
    />
  </div>
);
