import { randoNum } from "../utils";
import { preGenJokes } from "./jokes";
import { preGenRiddles } from "./riddles";
import { preGenWouldYouRathers } from "./wouldyourather";

export default function contentLoader() {
  const preLoadedContent = [
    contentGetter(preGenJokes),
    contentGetter(preGenRiddles),
    contentGetter(preGenWouldYouRathers),
  ];

  return contentMixer(preLoadedContent.flat());
}

function contentGetter(contentArray: any[]) {
  const random1 = randoNum(0, contentArray.length - 1);
  const random2 = randoNum(0, contentArray.length - 1);
  return [contentArray[random1], contentArray[random2]];
}

function contentMixer(contentArray: any[]) {
  const tempArray = [contentArray[1], contentArray[3], contentArray[5]];
  contentArray.splice(1, 1);
  contentArray.splice(2, 1);
  contentArray.splice(3, 1);

  return tempArray.concat(contentArray);
}
