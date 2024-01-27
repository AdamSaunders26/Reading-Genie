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
      return `${contentType} about ${interest} `;
    default:
      return `${contentType}`;
  }
}
