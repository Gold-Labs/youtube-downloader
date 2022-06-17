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
    let fileName = pPlatform === "win32" ? "yt.exe" : "yt";

    await YTDlpWrap.downloadFromGithub(
      `${buildPath}/${fileName}`,
      undefined,
      pPlatform
    );
  },
};
