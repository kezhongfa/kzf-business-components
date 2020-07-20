const path = require("path");
const debuggerUtils = require("@shuyun-ep-team/utils/cjs/dev-tools/debugger");

debuggerUtils.createDebugFile(path.resolve(__dirname, "../dist/debug.json"));
