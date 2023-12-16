export default function geniePrompt(
  textLength: string,
  contentType: string,
  interest: string
) {
  console.log({ textLength });
  console.log({ contentType });
  console.log({ interest });
  switch (contentType) {
    case "Facts":
      return `You are a children’s tv presenter, for example on Blue Peter. You are chatting to a group of 8 year old children about ${interest}. In ${textLength}, give them an interesting ${contentType}. Use emojis after each sentence`;
    default:
      return `You are a children’s tv presenter, for example on Blue Peter. You are chatting to a group of 8 year old children. In ${textLength}, give them a single interesting ${contentType}. Use emojis after each sentence`;
  }
}
