import React from "react";
import { Debug } from "./Debug";

export default {
  title: "Debug",
  component: Debug,
  parameters: {
    info: { inline: true, header: false },
  },
};

export const DebugStory: React.FunctionComponent = () => (
  <div>
    <h1 className="storybook-title">Debug</h1>
    <Debug title="Debug Title">Testing</Debug>
  </div>
);
