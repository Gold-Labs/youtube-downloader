import axios from "axios";
import { YoutubeData } from "./types/youtube";

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
