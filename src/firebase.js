import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDRovkc3Z3ZN7AY9pn107ew1OGsOVcJ_uo",
  authDomain: "aprovacoes-app.firebaseapp.com",
  projectId: "aprovacoes-app",
  storageBucket: "aprovacoes-app.appspot.com",
  messagingSenderId: "31654976563",
  appId: "1:31654976563:web:9d31174bb538ac29851746",
  measurementId: "G-XQR0274M49",
};

// **Inicialize o app antes de usar auth, db e storage**
const app = initializeApp(firebaseConfig);

// Agora exporte:
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
