import axios from "axios";
import { YoutubeData } from "./youtube";

// async function getYoutubeData() {
//   const result = await axios.get(url);
//   const str = /(?<=var ytInitialData = )(.*?)(?=<\/script>)/g;
//   const html = String(result.data);
//   const matched = html.match(str)?.[0];
//   const refinedString = matched?.replace(/;/g, "")!;
//   const youtubeData: YoutubeData = JSON.parse(refinedString);
//   youtubeData.contents.twoColumnBrowseResultsRenderer.tabs.at(0)?.tabRenderer.content.sectionListRenderer.contents

//   (content=>
//     content.itemSectionRenderer.contents.map
//     )
// }

export default async function getVideoIdList(url: string) {
  const result = await axios.get(url);
  const str = /(?<=playlistVideoListRenderer)(.*?)(?=isEditable)/g;
  const html = String(result.data);
  const matched = html.match(str)![0]!;
  const lastIndex = matched.lastIndexOf("playlistId");
  const stringJson = (matched?.slice(2, lastIndex - 2) + "}").toString();
  const JsonData: YoutubeData = JSON.parse(stringJson);
  const videoIdList = JsonData.contents.map(
    (content) => content.playlistVideoRenderer.videoId
  );
  return videoIdList;
}
