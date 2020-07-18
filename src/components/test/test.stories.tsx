import React from "react";
import { withKnobs, text } from "@storybook/addon-knobs";
import Test from "./index";

export default {
  title: "Test",
  component: Test,
  decorators: [withKnobs],
};

export const defaultButton = () => <Test label={text("label", "With args")} />;
