const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const { CCMS_INFOS_CONFIG } = require("./app.config.js");

const { ORIGIN } = CCMS_INFOS_CONFIG;

// 设置静态文件代理
const StaticFrontServices = [
  "/web-common-resource", // 公共配置
];

const app = express();

StaticFrontServices.forEach((service) => {
  app.use(
    service,
    createProxyMiddleware({
      target: ORIGIN,
      changeOrigin: true,
    })
  );
});
app.listen(4000);
