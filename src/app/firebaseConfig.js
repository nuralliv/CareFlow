import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
   apiKey: "AIzaSyBIVFY3BdfM6PfBAUHzNTAJ_TTrqkGb0nQ",
   authDomain: "dipl-a9b59.firebaseapp.com",
   databaseURL: "https://dipl-a9b59-default-rtdb.firebaseio.com",
   projectId: "dipl-a9b59",
   storageBucket: "dipl-a9b59.firebasestorage.app",
   messagingSenderId: "882620525927",
   appId: "1:882620525927:web:576a63816da51cf5a913c2",
   measurementId: "G-71QS15JZ1J"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
