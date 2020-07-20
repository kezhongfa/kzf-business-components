const {
  checkNodeJsVersion,
} = require("@shuyun-ep-team/utils/cjs/checkNodeJsVersion");
const { engines } = require("../package.json");

checkNodeJsVersion(engines);
