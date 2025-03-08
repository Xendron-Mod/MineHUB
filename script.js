// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeKe7IYBRcprqTdGQ_FeYA517dTBnsJ9k",
  authDomain: "mine-hub.firebaseapp.com",
  projectId: "mine-hub",
  storageBucket: "mine-hub.firebasestorage.app",
  messagingSenderId: "261499345758",
  appId: "1:261499345758:web:eac776fd4aac8486104dcf",
  measurementId: "G-4VFX5L56V8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
