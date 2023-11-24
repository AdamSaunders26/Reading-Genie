// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";
import { doc, getFirestore, setDoc } from "firebase/firestore";

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
const db = getFirestore(firebase_app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    setDoc(doc(db, "genie-users", uid), {
      name: "Timmy",
      age: "7",
      topics: ["minecraft, gymnastics, egypt"],
      chatGPT: "thing",
    });
    console.log("AUTH STATE CHANGED", user);
  } else {
    console.log("AUTH STATE CHANGED", user);
  }
});

async function firebase_init() {
  const signIn = await signInAnonymously(auth);
  console.log(signIn);
}

export default firebase_init;
