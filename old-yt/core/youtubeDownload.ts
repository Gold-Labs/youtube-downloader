import fs from "fs";
import ytdl from "ytdl-core";
import getVideoIdList from "./getVideoListData";
import path from "path";
const isPlayList = (url: string) => {
  return url.includes("playlist");
};

export default async function youtubeDownload(url: string, path: string) {
  console.log({ path, url });
  if (isPlayList(url)) {
    const videoIdList = await getVideoIdList(url);
    return Promise.all(
      videoIdList.map((id) => downloadYoutubeVideoById(id, path))
    );
  }
  // return downloadWithCookie(path);
  return downloadYoutubeVideoById(url, path);
  return new Promise((resolve, reject) => {
    ytdl(url).pipe(fs.createWriteStream(path + "/video.mp4"));
  });
}

async function downloadYoutubeVideoById(idOrUrl: string, path: string) {
  const isUrl = idOrUrl.startsWith("http");
  console.log(idOrUrl);
  const url = isUrl ? idOrUrl : `https://youtube.com/watch?v=${idOrUrl}`;
  console.log({ url });
  const info = await ytdl.getInfo(url);
  // fs.writeFileSync(`./${info.videoDetails.}`)
  console.log({ formats: info.formats });
  const specialCharacterReg = /[\\\/:*?"<>\|\"]/gi;
  const title = info.videoDetails.title.replace(specialCharacterReg, "");
  console.log({ title, info: info.videoDetails.title });
  fs.writeFileSync(path + `/${title}.txt`, JSON.stringify(info.formats));
  new Promise((resolve, reject) => {
    ytdl(url).pipe(fs.createWriteStream(path + `/${title}.mp4`));
  });
}

async function downloadWithCookie(outputPath: string) {
  const COOKIE =
    "__utma=27069237.1885163843.1648771957.1648771957.1648771957.1; __utmz=27069237.1648771957.1.1.utmcsr=(direct)|utmccn=(direct)|utmcmd=(none); _gcl_au=1.1.1601203467.1651293438; PREF=tz=Asia.Seoul&f6=40000000&f5=20000&f4=4000000; SID=KQiyDyLehyvSUCXry_7SuJpg1Dl36WUc4v9-TeBkfp_K1oOSVC-CsYK1QyYHccU85ajB4Q.; APISID=wLEME5CEzDPZIvmN/AW3B4ZhjJVPElUBZZ; SAPISID=l_G2yV9egna72zRH/Am8GlogFLe8Mvk-Vu; __Secure-1PAPISID=l_G2yV9egna72zRH/Am8GlogFLe8Mvk-Vu; __Secure-3PAPISID=l_G2yV9egna72zRH/Am8GlogFLe8Mvk-Vu; SIDCC=AJi4QfE11p4bRtmUsvVvSmVj3xtNrpdcvgFPDkU3UuBbPg0QdJ4VJyAv4da2lqM72HPBuOOgHw";
  const videoID = "UNYg3mw93NA";

  const outputName = "video.mp4";
  const video = ytdl(videoID, {
    requestOptions: {
      headers: {
        cookie: COOKIE,
        // Optional. If not given, ytdl-core will try to find it.
        // You can find this by going to a video's watch page, viewing the source,
        // and searching for "ID_TOKEN".
        // 'x-youtube-identity-token': 1324,
      },
    },
  });

  video.on("info", (info) => {
    console.log("title:", info.videoDetails.title);
    console.log("rating:", info.player_response.videoDetails.averageRating);
    console.log("uploaded by:", info.videoDetails.author.name);
  });

  video.on("progress", (chunkLength, downloaded, total) => {
    const percent = downloaded / total;
    console.log("downloading", `${(percent * 100).toFixed(1)}%`);
  });

  video.on("end", () => {
    console.log("saved to", outputName);
  });

  video.pipe(fs.createWriteStream(outputPath + "/" + outputName));
}
