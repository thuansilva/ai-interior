// Import the functions you need from the SDKs you need
import "dotenv/config";
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE,
  authDomain: "room-de920.firebaseapp.com",
  projectId: "room-de920",
  storageBucket: "room-de920.firebasestorage.app",
  messagingSenderId: "131137665773",
  appId: "1:131137665773:web:99b7171e9036b139ad6ae4",
  measurementId: "G-X94SLRE4W8",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);
