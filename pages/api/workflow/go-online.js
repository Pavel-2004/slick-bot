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

  workflow.on("getOffline", () => {
    const q = query(collection(db, "offline"), where("workflowId", "==", req.body.workflowId))
    getDocs(q)
      .then(offlines => {
        const offlineIds = []
        offlines.forEach(offline => {
          if (offline.userId === req.body.userId) {
            offlineIds.push(offline.id)
          }
        })
        workflow.emit("deleteBatch", offlineIds)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("deleteBatch", (deletes) => {
    const batch = writeBatch(db)
    deletes.forEach(del => {
      const deleteRef = doc(db, "offline", del)
      batch.delete(deleteRef)
    })
    batch.commit()
      .then(offlineDelete => {
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

  workflow.emit("getOffline")
}