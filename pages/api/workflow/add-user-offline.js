import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, addDoc, collection, doc, updateDoc, getDocs, getDoc} from "firebase/firestore";

export default function handler(req, res) {
  const workflow = new (require('events').EventEmitter)();

  const firebaseConfig = {
    apiKey: "AIzaSyAI6X0qbyUmQ88QP0FgDUd3HdERo6WxPpE",
    authDomain: "slick-bot-e8c24.firebaseapp.com",
    projectId: "slick-bot-e8c24",
    storageBucket: "slick-bot-e8c24.appspot.com",
    messagingSenderId: "1032046086635",
    appId: "1:1032046086635:web:93652ce229fcb76b8d31ae",
    measurementId: "G-4D1J2CRLGL"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

   workflow.on("createOffline", () => {
     addDoc(collection(db, "offline"), {
       workflowId: req.body.workflowId,
       userId: req.body.userId,
       done: Math.round(Date.now() / 1000) + req.body.hours * 60 * 60
     })
       .then(offline => {
         workflow.emit("success")
       })
       .catch(err => {
         workflow.emit("error", err.message)
       })
   })

  workflow.on("success", () => {
    res.send(JSON.stringify({error: false}))
  })

  workflow.on("error", (message) => {
    res.send(JSON.stringify({error: true, message}))
  })

  workflow.emit("createOffline")
}

