const fs = require("fs");
const path = require("path");
const YTDlpWrap = require("yt-dlp-wrap").default;

module.exports = {
  // 경로문제
  packageAfterCopy: async (
    forgeConfig,
    buildPath,
    electronVersion,
    pPlatform,
    pArch
  ) => {
    // const filePath = "resources/app/.webpack/main";
    let fileName = pPlatform === "win32" ? "yt.exe" : "yt";
    // if (forgeConfig.electronRebuildConfig.buildPath) {

    fs.promises.writeFile(
      "./a.txt",
      [buildPath, electronVersion, pPlatform, pArch].join("\n")
    );
    // }
    // let fileName = "yt";
    await YTDlpWrap.downloadFromGithub(
      `${buildPath}/${fileName}`,
      undefined,
      pPlatform
    );
  },
};
