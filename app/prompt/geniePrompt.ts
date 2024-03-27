export default function geniePrompt(contentType: string, interest: string, noOfBytes: number) {
  console.log({ contentType });
  console.log({ interest });
  switch (contentType) {
    case "many":
      console.log("many");
      return `${noOfBytes} bytes, fact:${interest}, poll:${interest}`;
    case "fact":
      return `${contentType} about ${interest} `;
    case "poll":
      return `${contentType} about ${interest} `;
    default:
      return `${contentType}`;
  }
}
