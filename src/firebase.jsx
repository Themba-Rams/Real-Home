// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore";                            //start
import { GoogleAuthProvider,getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC_fIA6izrqkMUnP_duFV-LQpJhzVvEOZE",
  authDomain: "rhome-c2fd6.firebaseapp.com",
  projectId: "rhome-c2fd6",
  storageBucket: "rhome-c2fd6.appspot.com",
  messagingSenderId: "689039435648",
  appId: "1:689039435648:web:8abfa8b414ccbd4353c365",
  measurementId: "G-2J31GPTT0Z"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export { app };
const analytics = getAnalytics(app);

export const db= getFirestore(app);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
