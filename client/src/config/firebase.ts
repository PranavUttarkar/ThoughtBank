// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth";
import {getFirestore} from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCNoxEbv6sdfaiPwmdc8O8WVvQW3RAFaQo",
  authDomain: "thoughtbank-original-set-up.firebaseapp.com",
  projectId: "thoughtbank-original-set-up",
  storageBucket: "thoughtbank-original-set-up.firebasestorage.app",
  messagingSenderId: "748757373578",
  appId: "1:748757373578:web:cd4481637c5c96cad79373",
  measurementId: "G-XMXJQJTJRN"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider
// const analytics = getAnalytics(app);

//for later use ^^


export const db = getFirestore(app);