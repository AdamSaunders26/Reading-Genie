export default function geniePrompt(contentType: string, interest: string) {
  console.log({ contentType });
  console.log({ interest });
  switch (contentType) {
    case "many":
      console.log("many");
      return "6 bytes, fact: cooking, poll:cooking";
    case "fact":
      return `${contentType} about ${interest} `;
    case "poll":
      return `${contentType} about ${interest} `;
    default:
      return `${contentType}`;
  }
}
