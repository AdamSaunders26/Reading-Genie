export default function geniePrompt(contentType: string, interest: string) {
  console.log({ contentType });
  console.log({ interest });
  switch (contentType) {
    case "fact":
      return `${contentType} about ${interest} `;
    case "poll":
      return `${contentType} about ${interest} `;
    default:
      return `${contentType}`;
  }
}
