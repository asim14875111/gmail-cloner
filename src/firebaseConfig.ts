import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBiXlX61xxMFqvZ9vHGDsmhbPghrR9uoJw",
  authDomain: "nextauthapp-4d566.firebaseapp.com",
  projectId: "nextauthapp-4d566",
  storageBucket: "nextauthapp-4d566.firebasestorage.app",
  messagingSenderId: "202555445723",
  appId: "1:202555445723:web:0a5ab62df0bf3d7ddd57fe",
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
