
import { initializeApp } from "firebase/app";
import { getFirestore,collection, addDoc, getDocs, doc, updateDoc,deleteDoc } from "firebase/firestore";
import {getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBuh1QDhrqzRk6Xz-WVIuQijXM0sWyKQQk",
  authDomain: "gsmobile-e8939.firebaseapp.com",
  projectId: "gsmobile-e8939",
  storageBucket: "gsmobile-e8939.appspot.com",
  messagingSenderId: "475873100178",
  appId: "1:475873100178:web:ac5ad005b4a0b5688d814b"
};


const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
const db = getFirestore(app);
export{app,db,getFirestore,collection, addDoc, getDocs, doc, updateDoc,deleteDoc}