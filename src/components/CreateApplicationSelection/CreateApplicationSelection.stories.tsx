import React from "react";
import { CreateApplicationSelection } from "./CreateApplicationSelection";

export default {
  title: "CreateApplicationSelection",
  component: CreateApplicationSelection,
  parameters: {
    info: { inline: true, header: false },
  },
};

export const CreateApplicationSelectionStory: React.FunctionComponent = () => (
  <div>
    <h1 className="storybook-title">CreateApplicationSelection</h1>
    <CreateApplicationSelection />
  </div>
);
