import React from "react";

export default {
  title: "首页",
  // decorators: [
  //   (storyFn: any) => (
  //     <div style={{ backgroundColor: "yellow" }}>{storyFn()}</div>
  //   ),
  // ],
};

export const Home = () => (
  <>
    <h1>业务组件库</h1>
    <ul>
      <li>Canvas: 简单描述</li>
      <li>Docs: 组件演示</li>
      <li>Notes: 使用文档</li>
    </ul>
    <h3>安装</h3>
    <code>npm install kzf-business-components -D</code>
  </>
);

Home.story = {
  // decorators: [],
  parameters: {
    docs: { disable: true },
  },
};
