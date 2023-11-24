// Import the functions you need from the SDKs you need
import { initializeApp, getApps, signInAnonymously, onAuthStateChanged, getAuth } from "firebase/app";

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
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];

const auth = getAuth(firebase_app);

onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log('AUTH STATE CHANGED', user);
  } else {
    console.log('AUTH STATE CHANGED', user);
  }
})

signInAnonymously(auth)
    .then(response => console.log('USER LOGGED IN', response))
    .catch(error => console.log('ERROR LOGGING IN', e));

    console.log('SIGNED IN', firebaseResponse);

export default firebase_app;