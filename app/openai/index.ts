import OpenAI from "openai";
import {
  doc,
  getDoc,
  setDoc,
  addDoc,
  collection,
  Timestamp,
} from "firebase/firestore";
import { db } from "../firebase/config";

const configuration = {
  apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
};

const assistantId = process.env.NEXT_PUBLIC_ASSISTANT_KEY;

const client = new OpenAI(configuration);

async function createCompletion(
  input: string,
  system = "You are a general purpose intelligence",
  model = "gpt-3.5-turbo"
) {
  try {
    const response = await client.chat.completions.create({
      model,
      messages: [
        {
          role: "system",
          content: system,
        },
        {
          role: "user",
          content: input,
        },
      ],
    });
    const answer = response.choices[0].message.content;
    return answer;
  } catch (e) {
    console.log("ERROR COMPLETING", e);
  }
}

async function createMessage(thread_id: string, content: string) {
  const messageObject = {
    role: "user",
    content,
  };

  try {
    const message = await client.beta.threads.messages.create(
      thread_id,
      // @ts-ignore
      messageObject
    );
    console.log("MESSAGE CREATED");
    return message;
  } catch (e) {
    console.log("ERROR CREATING MESSAGE", e);
  }
}

async function getThreadId(userSid: string) {
  const dbRecord = await getDoc(doc(db, "genie-users", userSid));
  if (!dbRecord.exists()) return null;
  const record = dbRecord.data();
  if (!record.hasOwnProperty("thread_id")) {
    const thread = await createThread(userSid);
    await setDoc(
      doc(db, "genie-users", userSid),
      { thread_id: thread?.id },
      { merge: true }
    );
    return thread?.id;
  } else {
    return record.thread_id;
  }
}

async function createThread(userSid = "", instructions = "") {
  try {
    const thread = await client.beta.threads.create({
      metadata: {
        userSid,
      },
    });
    console.log("THREAD CREATED");
    return thread;
  } catch (e) {
    console.log("ERROR CREATING THREAD", e);
  }
}

async function createRun(
  assistant_id: string,
  thread_id: string,
  instructions: string
) {
  try {
    console.log("INS", instructions);
    const runJob = await client.beta.threads.runs.create(thread_id, {
      assistant_id,
      instructions: instructions,
    });
    console.log("RUN CREATED", runJob);
    return runJob;
  } catch (e) {
    console.log("ERROR CREATING RUN", e);
  }
}

async function checkRun(thread_id: string, run_id: string) {
  const run = await client.beta.threads.runs.retrieve(thread_id, run_id);
  return (
    run.status == "completed" ||
    run.status == "failed" ||
    run.status == "expired"
  );
}

async function loopRunAndReturn(thread_id: string, run_id: string) {
  let returned = false;
  while (!returned) {
    returned = await checkRun(thread_id, run_id);
  }
  const messages = await client.beta.threads.messages.list(thread_id);
  // @ts-ignore
  return messages.data[0].content[0].text.value;
}

async function tidyText(inputText: string) {
  const answer = await createCompletion(
    inputText,
    "You are a proof reader; only response to the user with their input formatted with proper grammar and punctuation."
  );
  console.log(`Tidying "${inputText}" to "${answer}"`);
  return answer;
}

async function addMessage(userSid: string, body: string, instructions: string) {
  let returned = false;
  let thread_id = await getThreadId(userSid);

  const addedMessage = await createMessage(thread_id, body);

  const runStarted = await createRun(assistantId, thread_id, instructions);
  const response = await loopRunAndReturn(thread_id, runStarted.id);

  await addDoc(collection(db, "genie-users", userSid, "messages"), {
    body: response,
    timestamp: Timestamp.now(),
  });

  console.log("ASKING", userSid, body, response);

  return {
    response,
  };
}

export { addMessage, createMessage, tidyText };
