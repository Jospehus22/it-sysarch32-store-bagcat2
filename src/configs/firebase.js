// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBoX3VJQ6Hhh65qbCK-FImOooPeRC3Klmo",
  authDomain: "it-sysarch32-store-bagca-df4ff.firebaseapp.com",
  projectId: "it-sysarch32-store-bagca-df4ff",
  storageBucket: "it-sysarch32-store-bagca-df4ff.appspot.com",
  messagingSenderId: "648000375282",
  appId: "1:648000375282:web:b4cf78365a6b17c910436b",
  measurementId: "G-077VKMSL36"
};
const app = initializeApp(firebaseConfig);

// Initialize Firebase
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
const analytics = getAnalytics(app);
