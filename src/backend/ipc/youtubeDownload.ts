import YTDlpWrap from "yt-dlp-wrap";
import fs from "fs";
import os from "os";
import path from "path";
import getVideoIdList from "../getVideoListData";

type PathByOS = Record<NodeJS.Platform, string>;

function createytDlpWrap() {
  const isWin32 = os.platform() === "win32";
  const fileName = isWin32 ? "yt.exe" : "yt";

  if (process.env.NODE_ENV === "development") {
    return new YTDlpWrap();
  }
  const filePathByOS: Partial<PathByOS> = {
    darwin: path.resolve(__dirname + `/../../${fileName}`),
    win32: path.resolve(__dirname + `/../../${fileName}`),
  };

  !isWin32 && fs.chmodSync(filePathByOS[os.platform()], "777");

  const filePath = filePathByOS[os.platform()];
  return new YTDlpWrap(filePath);
}

const isPlayList = (url: string) => {
  return url.includes("playlist");
};

const ytDlpWrap = createytDlpWrap();

async function downloadYoutubeByURL(url: string, path: string) {
  return ytDlpWrap.execPromise([url, "--paths", path]);
}

async function downloadYoutubeVideoById(id: string, path: string) {
  return ytDlpWrap.execPromise([
    `https://www.youtube.com/watch?v=${id}`,
    "--paths",
    path,
  ]);
}
export async function youtubeDownload(url: string, path: string) {
  if (isPlayList(url)) {
    const videoIdList = await getVideoIdList(url);

    return Promise.all(
      videoIdList.map((id) => downloadYoutubeVideoById(id, path))
    );
  }
  return downloadYoutubeByURL(url, path);
}
