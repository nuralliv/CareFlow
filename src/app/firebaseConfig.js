// src/app/firebaseConfig.js
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, ref, set } from "firebase/database";
import { getStorage } from "firebase/storage"; 

const firebaseConfig = {
   apiKey: "AIzaSyDAyPabtJ-dRIYX0LHvXA9ln2D1PXlfr5c",
   authDomain: "gos-b5908.firebaseapp.com",
   databaseURL: "https://gos-b5908-default-rtdb.firebaseio.com",
   projectId: "gos-b5908",
   // storageBucket: "gos-b5908.firebasestorage.app",
   storageBucket: "gos-b5908.appspot.com", 
   messagingSenderId: "636214688128",
   appId: "1:636214688128:web:ac7183c42c633a3d1c6965",
   measurementId: "G-XEKKYK2C02"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getDatabase(app);

export { auth, db };
export const storage = getStorage(app);
