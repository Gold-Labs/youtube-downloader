import YTDlpWrap from "yt-dlp-wrap";
import fs from "fs";
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
const ytDlpWrap = new YTDlpWrap();
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
import path from "path";
import getVideoIdList from "./getVideoListData";

console.log(__dirname);
async function ss() {
  // console.log(new(Date()))
  const url =
    "https://youtube.com/playlist?list=PLPa7JEbK4Xev-34Ks-LxCy6kelCB7h3DC";
  const videoIDList = await getVideoIdList(url);
  const downloadVideos = videoIDList.map((id) => {
    return ytDlpWrap.execPromise([
      `https://www.youtube.com/watch?v=${id}`,
      "--paths",
      `${__dirname}/ss`,
    ]);
  });
  return Promise.all(downloadVideos);
}
async function main() {
  console.time("hello");
  await ss();
  console.timeEnd("hello");
}
main();
// async function b() {
//   let stdout = await ytDlpWrap.execPromise([
//     "https://youtube.com/playlist?list=PLPa7JEbK4Xev-34Ks-LxCy6kelCB7h3DC",
//     "-f",
//     "best",
//     "--paths",
//     `${__dirname}/ss`,
//   ]);
//   console.log(stdout);
// }
// b();
