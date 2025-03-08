// src/config/firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCqYfZJhlSfVkXmWhYoCu7bUTgYuefsiWc",
  authDomain: "greenhouse-f7553.firebaseapp.com",
  projectId: "greenhouse-f7553",
  storageBucket: "greenhouse-f7553.firebasestorage.app",
  messagingSenderId: "1056412589652",
  appId: "1:1056412589652:web:f4aabc4e4ffb32db7b97c1",
  measurementId: "G-F2QV60HJSY"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

if (process.env.NODE_ENV === 'development') {
  console.log('Firebase initialized successfully with config:', firebaseConfig);
}

export default app;