import React from "react";

export const commonStoryWrapper = (stroyFn: any) => (
  <div>
    <h3>demo演示</h3>
    {stroyFn()}
  </div>
);

export const languageOptions = ["zh-CN", "en-US"];
