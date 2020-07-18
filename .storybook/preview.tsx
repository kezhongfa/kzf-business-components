import React from "react";
import { addDecorator, addParameters, configure } from "@storybook/react";
// import { withInfo } from "@storybook/addon-info";

const wrapperStyle: React.CSSProperties = {
  padding: "20px 40px",
};

const storyWrapper = (stroyFn: any) => (
  <div style={wrapperStyle}>
    <h3>组件演示</h3>
    {stroyFn()}
  </div>
);
addDecorator(storyWrapper);
// addDecorator(withInfo);
// addParameters({ info: { inline: true, header: false } });

const loaderFn = () => {
  const allExports = [require("../src/welcome.stories.jsx")];
  const staticReq = require.context(
    "../src/static",
    true,
    /\.stories\.(js|jsx|ts|tsx)$/
  );

  staticReq.keys().forEach((fname) => allExports.push(staticReq(fname)));

  const req = require.context(
    "../src/components",
    true,
    /\.stories\.(js|jsx|ts|tsx)$/
  );

  req.keys().forEach((fname) => allExports.push(req(fname)));
  return allExports;
};

// automatically import all files ending in *.stories.js
configure(loaderFn, module);
