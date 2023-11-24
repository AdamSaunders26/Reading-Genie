// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import {
  addDoc,
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

const auth = getAuth(firebase_app);
export const db = getFirestore(firebase_app);

let uid: string | null = null;
onAuthStateChanged(auth, (user) => {
  if (user) {
    uid = user.uid;
    // setDoc(doc(db, "genie-users", uid), {
    //   name: "Timmy",
    //   age: "7",
    //   topics: ["minecraft, gymnastics, egypt"],
    //   chatGPT: "thing",
    // });
    console.log("AUTH STATE CHANGED", user);
  } else {
    console.log("AUTH STATE CHANGED", user);
  }
});

async function firebase_init(
  setState: React.Dispatch<React.SetStateAction<string[] | null>>
) {
  const signIn = await signInAnonymously(auth);
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

// export async function saveField(path: [], value: unknown) {
//   const data = {value}
//   const savedDoc = await setDoc(doc(db, ...path, ), data);
// }

export function getData() {
  if (uid) {
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
      if (chatbox) {
        fuckyoureact?.scrollTo(0, chatbox.scrollHeight);
      }
    });
  }
}

export default firebase_init;
