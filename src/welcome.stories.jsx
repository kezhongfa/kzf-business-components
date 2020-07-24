import React from "react";

export default {
  title: "Welcome",
  // decorators: [
  //   (storyFn: any) => (
  //     <div style={{ backgroundColor: "yellow" }}>{storyFn()}</div>
  //   ),
  // ],
};

export const Welcome = () => (
  <>
    <h1>欢迎来到 kzf 的组件库</h1>
    <ul>
      <li>Canvas: 简单描述</li>
      <li>Docs: 组件演示</li>
      <li>Notes: 使用文档</li>
    </ul>
    <h3>安装试试</h3>
    <code>npm install kzf-business-components -D</code>
  </>
);

Welcome.story = {
  // decorators: [],
  parameters: {
    docs: { disable: true },
  },
};
