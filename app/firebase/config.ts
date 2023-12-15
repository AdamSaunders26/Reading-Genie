"use client";
// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  addDoc,
  getDoc,
  collection,
  doc,
  getFirestore,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  where,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
};

// Initialize Firebase
let firebase_app =
  getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

export const auth = getAuth(firebase_app);
export const db = getFirestore(firebase_app);
export let userId = null;
let uid: string | null = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    userId = uid;
    console.log("AUTH STATE CHANGED", user);
  } else {
    console.log("AUTH STATE CHANGED", user);
  }
});

export async function getUserRecord(uid: string | null) {
  if (uid) {
    const rec = await getDoc(doc(db, "genie-users", uid));
    return rec.data();
  }
}

export async function initFirebase() {
  const signIn = await signInAnonymously(auth);
  saveField(["genie-users", signIn.user.uid], { added: Timestamp.now() });
  return signIn.user.uid;
}

export async function addDocument(data: string) {
  if (uid) {
    const doc = await addDoc(collection(db, "genie-users", uid, "messages"), {
      body: data,
      timestamp: Timestamp.now(),
    });
  }
}

export async function saveField(path: [string, string], value: any) {
  try {
    const savedDoc = await setDoc(doc(db, ...path), value, { merge: true });
    console.log("Saved", savedDoc);
  } catch (e) {
    console.log("Error saving", e);
  }
}

export function onData(
  uid: string | null,
  setDbData: React.Dispatch<React.SetStateAction<string[] | null>>
) {
  console.log("onData auth", uid);
  if (!uid) return;
  const q = query(
    collection(db, "genie-users", uid, "messages"),
    orderBy("timestamp", "asc")
  );

  onSnapshot(q, (querySnapshot) => {
    const dataArray: string[] = [];

    querySnapshot.forEach((o) => {
      dataArray.push(o.data().body);
    });
    const fuckyoureact = document.querySelector("#fuckyoureact");
    const chatbox = document.querySelector("#chatbox");
    setTimeout(() => {
      if (chatbox) {
        fuckyoureact?.scrollTo({
          top: chatbox.scrollHeight,
          behavior: "smooth",
        });
      }
    }, 500);
    setDbData(dataArray);
  });
}
