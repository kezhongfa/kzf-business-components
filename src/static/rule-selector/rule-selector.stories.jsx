import React from "react";
import readme from "./readme.md";

export default {
  title: "规则选择器",
  parameters: {
    notes: readme,
  },
};

export const RuleSelector = () => (
  <>
    <h1>规则选择器</h1>
    <p>
      如何使用请点击<span style={{ color: "red" }}>上方Notes</span>查看
    </p>
  </>
);

RuleSelector.story = {
  parameters: {
    docs: { disable: true },
  },
};
