import React from "react";
import { addDecorator, addParameters, configure } from "@storybook/react";
import { withConsole } from "@storybook/addon-console";
import "@shuyun-ep-team/kylin-ui/es/styles/index.css";
import { bodyBackground } from "@shuyun-ep-team/kylin-ui/es/styles/vars";
import "../src/styles/index.css";
const globalWrapperStyle: React.CSSProperties = {
  padding: "20px",
};

const globalWrapper = (stroyFn: any) => <div style={globalWrapperStyle}>{stroyFn()}</div>;
addDecorator(globalWrapper);
addDecorator((storyFn, context) => withConsole()(storyFn)(context));

addParameters({
  backgrounds: [
    { name: "default", value: "#fff", default: true },
    { name: "kylin", value: bodyBackground },
    { name: "twitter", value: "#00aced" },
    { name: "facebook", value: "#3b5998" },
  ],
});

const loaderFn = () => {
  const allExports = [require("../src/home.stories.jsx")];
  const staticReq = require.context("../src/static", true, /\.stories\.(js|jsx|ts|tsx)$/);

  staticReq.keys().forEach((fname) => allExports.push(staticReq(fname)));

  const req = require.context("../src/components", true, /\.stories\.(js|jsx|ts|tsx)$/);

  req.keys().forEach((fname) => allExports.push(req(fname)));
  return allExports;
};

// automatically import all files ending in *.stories.(js|jsx|ts|tsx)
configure(loaderFn, module);
