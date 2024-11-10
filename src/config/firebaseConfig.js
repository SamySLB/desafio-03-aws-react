
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAn-WYB027TrpFVK8qVeQaNRqfYaa5xCqY",
  authDomain: "github-project-aac12.firebaseapp.com",
  projectId: "github-project-aac12",
  storageBucket: "github-project-aac12.firebasestorage.app",
  messagingSenderId: "676096833447",
  appId: "1:676096833447:web:cbe64254dbb65a77856882"
};


export const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);