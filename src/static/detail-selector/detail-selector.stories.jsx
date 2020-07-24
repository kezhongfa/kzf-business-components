import React from "react";
import readme from "./readme.md";

export default {
  title: "明细选择器",
  parameters: {
    notes: readme,
  },
};

export const DetailSelector = () => (
  <>
    <h1>明细选择器</h1>
    <p>
      如何使用请点击<span style={{ color: "red" }}>上方Notes</span>查看
    </p>
  </>
);

DetailSelector.story = {
  parameters: {
    docs: { disable: true },
  },
};
