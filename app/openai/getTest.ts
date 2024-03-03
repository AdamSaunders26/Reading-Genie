import OpenAI from "openai";
import genieContent from "./genieContent";

const openai = new OpenAI({
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

export async function newGenie(topic: string) {
  const completion = await openai.chat.completions.create({
    messages: [
      {
        role: "system",
        content: genieContent("pizza"),
      },
    ],
    model: "gpt-3.5-turbo",
  });

  console.log(completion.choices[0]);
  return completion.choices[0].message.content;
}
