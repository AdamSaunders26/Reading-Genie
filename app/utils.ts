export function responseFormatter(
  message: string,
  contentRef: React.MutableRefObject<HTMLDivElement | null>,
  setVisibleLike: React.Dispatch<React.SetStateAction<boolean>>,
  setLoading: React.Dispatch<React.SetStateAction<boolean>>,
  currentByteId: string | null,
  typingFinished: any
) {
  const splitResponse = message.split(" ");
  const delay = 100;
  let previousPhrase = "";
  const sequenceArray = splitResponse.map(
    (word): [string, () => void, number] => {
      previousPhrase += ` ${word}`;
      return [
        previousPhrase,
        () => {
          scrollToBottom(contentRef);
        },
        delay,
      ];
    }
  );
  sequenceArray.push([
    previousPhrase,
    () => {
      typingFinished(currentByteId)
    },
    10,
  ]);
  sequenceArray.push([
    previousPhrase,
    () => {
      scrollToBottom(contentRef);
    },
    10,
  ]);
  setLoading(false);
  return sequenceArray.flat();
}

export function scrollToBottom(
  contentRef: React.MutableRefObject<HTMLDivElement | null>
) {
  if (contentRef.current) {
    contentRef.current.scrollIntoView(false);
  }
}

export function randoNum(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export function replaceQuotationMarks(input: string): string {
  let replaced = input.replace(/[\u201C]/g, '"');
  replaced = replaced.replace(/[\u201D]/g, '"');

  return replaced;
}
