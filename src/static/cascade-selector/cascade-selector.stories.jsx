import React from "react";
import readme from "./readme.md";

export default {
  title: "级联选择器",
  parameters: {
    notes: readme,
  },
};

export const CascadeSelector = () => (
  <>
    <h1>级联选择器</h1>
    <p>
      如何使用，请点击上方<span style={{ color: "red" }}>Notes</span>查看
    </p>
  </>
);

CascadeSelector.story = {
  // parameters: {
  //   docs: { disable: true },
  // },
};
