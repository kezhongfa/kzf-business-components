const shell = require("shelljs");
const colors = require("colors");
const argv = require("./argv");

const { version, tag = "latest" } = argv;

if (version) {
  const execAsyncEndTasks = [];
  const execBuildTask = () => execAsync("npm run build", "execBuildTask");
  const execVersionTask = () =>
    execAsync(`npm version ${version} -m "chore: version %s"`, "execVersionTask");
  const execCommonTask = () => {
    shell.cp("package.json", "dist");
    shell.cp("README.md", "dist");
  };
  const execNpmConfigTask = () => execAsync("npm config get registry", "execNpmConfigTask");
  const execPublishTask = () =>
    execAsync(`npm publish --access=public dist --tag ${tag}`, "npmRegistry");
  const execSyncTaoBaoTask = () =>
    execAsync(
      "curl -X PUT https://npm.taobao.org/sync/kzf-business-components",
      "execSyncTaobaoTask"
    );
  const execPushTagTask = () => execAsync("git push --follow-tags", "execPushTagTask");

  execBuildTask()
    .then(execVersionTask)
    .then(execCommonTask)
    .then(execNpmConfigTask)
    .then(execPublishTask)
    .then(execSyncTaoBaoTask)
    .then(execPushTagTask)
    .then(() => {
      console.log("发布成功".green);
      process.exit(0);
    })
    .finally(() => {
      if (execAsyncEndTasks.length > 0) {
        execAsyncEndTasks.forEach((task) => {
          task();
        });
      }
    })
    .catch((err) => {
      console.log(colors.red(err));
      process.exit(1);
    });
} else {
  console.error(colors.red("你未指定version参数"));
}

function execAsync(command, execLog) {
  return new Promise((resolve, reject) => {
    const child = shell.exec(command, { async: true });
    console.log(`${execLog} start`.green);
    child.stdout.on("data", function (data) {
      console.log(`${execLog} stdout ${data}`.yellow);
      if (execLog === "execNpmConfigTask" && !data.includes("registry.npmjs.org")) {
        shell.exec("npm config set registry=https://registry.npmjs.org");
        execAsyncTaskEnd.push(() =>
          shell.exec("npm config set registry=http://registry.npm.taobao.org")
        );
      }
    });
    child.on("close", function (code) {
      if (code === 0) {
        console.log(`${execLog} end`.green);
        resolve();
      } else {
        const error = `${execLog} fail`.red;
        reject(error);
      }
    });
  });
}
