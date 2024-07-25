import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";
// import { getAnalytics } from "firebase/analytics";
import { getPerformance } from "firebase/performance";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBSP_SNiZr3K7Dh8kgSivw1t9SuBaDnPDQ",
  authDomain: "link-sharing-app-58f3f.firebaseapp.com",
  projectId: "link-sharing-app-58f3f",
  storageBucket: "link-sharing-app-58f3f.appspot.com",
  messagingSenderId: "288756519714",
  appId: "1:288756519714:web:45e6a667c60099ffcacb7b",
  measurementId: "G-B1BHDTKYWJ"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const storage = getStorage(app);
export default function initFirebase() {
  if (!firebase.apps.length) {
    app;
    if (typeof window !== "undefined") {
      if ("measurementId" in firebaseConfig) {
        getAnalytics(app);
        getPerformance(app);
      }
    }
    console.log("Firebase was successfully initilized");
  }
}
