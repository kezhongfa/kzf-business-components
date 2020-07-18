const shell = require("shelljs");
const colors = require("colors");
const argv = require("./argv");

const { version, tag = "latest" } = argv;

if (version) {
  shell.exec(`npm version ${version} -m "chore: version %s"`);
  shell.rm("-rf", "dist");
  shell.exec("npm run build");
  shell.cp("package.json", "dist");
  shell.cp("README.md", "dist");
  shell.exec("npm config get registry", (_, stdout) => {
    if (!stdout.includes("registry.npmjs.org")) {
      shell.exec("npm config set registry=https://registry.npmjs.org");
    }
    shell.exec(`npm publish --access=public dist --tag ${tag}`);
    shell.exec(
      "curl -X PUT https://npm.taobao.org/sync/kzf-business-components"
    );
    shell.exec("git push --follow-tags");
  });
} else {
  console.error(colors.red("你未指定version 参数"));
}
