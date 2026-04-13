import { initializeApp, getApps, getApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyAJ6fSVsdnMni2lv6qfmPm96Vyvt-P6fT",
  authDomain: "plucky-order-493107-m8.firebaseapp.com",
  projectId: "plucky-order-493107-m8",
  storageBucket: "plucky-order-493107-m8.firebasestorage.app",
  messagingSenderId: "684035355688",
  appId: "1:684035355688:web:5be2ebda78f6e84203f11d",
  measurementId: "G-5NCKNLKHKV"
};

// Initialize Firebase (HMR-safe)
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);

export { db };
