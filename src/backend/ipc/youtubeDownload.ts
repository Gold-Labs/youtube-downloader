import YTDlpWrap from "yt-dlp-wrap";
import fs from "fs";
import os from "os";
// async function downloadYTDLP() {
//   let githubReleasesData = await YTDlpWrap.getGithubReleases(1, 5);
//   //Download the yt-dlp binary for the given version and platform to the provided path.
//   //By default the latest version will be downloaded to "./yt-dlp" and platform = os.platform().
//   await YTDlpWrap.downloadFromGithub();

//   //Init an instance with a given binary path.
//   //If none is provided "yt-dlp" will be used as command.
// }
// //Get the data from the github releases API. In this case get page 1 with a maximum of 5 items.
// downloadYTDLP();

// ytdlp 깃허브에서 다운받아 OS별로

const fileName = os.platform() === "win32" ? "yt.exe" : "yt";
const ytDlpWrap = new YTDlpWrap(`./resources/app/${fileName}`);
import path from "path";
import getVideoIdList from "../getVideoListData";

const isPlayList = (url: string) => {
  return url.includes("playlist");
};

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

// let readableStream = ytDlpWrap.execStream([
//   "https://youtube.com/playlist?list=PLPa7JEbK4Xev-34Ks-LxCy6kelCB7h3DC",
// ]);
// readableStream.pipe(fs.createWriteStream("./ss/test.mp4"));
// async function a() {
//   let metadata = await ytDlpWrap.getVideoInfo(
//     "https://youtube.com/playlist?list=PLPa7JEbK4Xev-34Ks-LxCy6kelCB7h3DC"
//   );
//   console.log({ metadata });
// }
// a();
