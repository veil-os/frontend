import React from "react";
import { ApplicationSelection } from "./ApplicationSelection";

export default {
  title: "ApplicationSelection",
  component: ApplicationSelection,
  parameters: {
    info: { inline: true, header: false },
  },
};

export const ApplicationSelectionStory: React.FunctionComponent = () => (
  <div>
    <h1 className="storybook-title">ApplicationSelection</h1>
    <ApplicationSelection />
  </div>
);
