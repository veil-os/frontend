import "../src/index.css";
import "./storybook.css";
import { addDecorator } from "@storybook/react";
import { withInfo } from "@storybook/addon-info";
import { withKnobs } from "@storybook/addon-knobs";
import { MemoryRouter } from "react-router-dom";

addDecorator(withInfo);
addDecorator(withKnobs);
addDecorator((Story) => (
  <MemoryRouter>
    <Story />
  </MemoryRouter>
));
