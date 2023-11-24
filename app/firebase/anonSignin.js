import firebase_app from "./config";
import { getAuth, signInAnonymously, onAuthStateChanged } from "firebase/auth";

const auth = getAuth(firebase_app);

export default async function signUp(email, password) {
    let result = null,
        error = null;
    try {
        result = await signInAnonymously(auth);
        console.log('SIGNED IN: ', result);
    } catch (e) {
        error = console.log('SIGNIN ERROR', e);
    }

    return { result, error };
}