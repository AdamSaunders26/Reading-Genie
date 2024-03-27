import { randoNum } from "../utils";
import { preGenJokes } from "./jokes";
import { preGenRiddles } from "./riddles";
import { preGenWouldYouRathers } from "./wouldyourather";

// export default function contentLoader() {
//   const preLoadedContent = [
//     contentGetter(preGenJokes),
//     contentGetter(preGenRiddles),
//     contentGetter(preGenWouldYouRathers),
//   ];

//   return contentMixer(preLoadedContent.flat());
// }

// function contentGetter(contentArray: any[]) {
//   const random1 = randoNum(0, contentArray.length - 1);
//   const random2 = randoNum(0, contentArray.length - 1);
//   return [contentArray[random1], contentArray[random2]];
// }

// function contentMixer(contentArray: any[]) {
//   const tempArray = [contentArray[1], contentArray[3], contentArray[5]];
//   contentArray.splice(1, 1);
//   contentArray.splice(2, 1);
//   contentArray.splice(3, 1);

//   return tempArray.concat(contentArray);
// }



export default function contentLoader(quantity: number) {
  const content = []

  let i = 1;

  for (i; i <= quantity; i++) {
    if(i % 3 === 0){
      let randomNumber = randoNum(0, preGenRiddles.length - 1)
      content.push(preGenRiddles[randomNumber])
    }
    else if(i % 2 === 0){
      let randomNumber = randoNum(0, preGenWouldYouRathers.length - 1)
      content.push(preGenWouldYouRathers[randomNumber])
    } else {
      let randomNumber = randoNum(0, preGenJokes.length - 1)
      content.push(preGenJokes[randomNumber])
    }
  }

  return content;

}