import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, addDoc, collection, doc, updateDoc, getDocs, getDoc, query, where, writeBatch} from "firebase/firestore";

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

  console.log("here here")

  workflow.on("getChat", () => {
    const docRef = doc(db, "activeChats", req.body.chatId)
    getDoc(docRef)
      .then(chat => {
        const currentChats = chat.data().chats
        currentChats.push({
          content: req.body.content,
          from: req.body.from,
          type: "text"
        })
        workflow.emit("updateChat", currentChats)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("updateChat", (chats) => {
    const docRef = doc(db, "activeChats", req.body.chatId)
    updateDoc(docRef, {chats: chats})
      .then(chat => {
        console.log("update success")
        workflow.emit("success")
      })
      .catch(err => {
        console.log('error', err.message)
        workflow.emit("error", err.message)
      })
  })

  workflow.on("success", () => {
    res.send(JSON.stringify({error: false}))
  })

  workflow.on("error", (message) => {
    console.log('message', message)
    res.send(JSON.stringify({error: true, message}))
  })

  workflow.emit("getChat")
}