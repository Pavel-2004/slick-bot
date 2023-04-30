import { initializeApp } from "firebase/app";
import {getFirestore, getDocs, query, collection, doc, getDoc, updateDoc} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getUserIdToken} from "../../../function/checkAuth";

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
  const auth = getAuth(app);

  workflow.on("checkAuth", () => {
    getUserIdToken(db, req.body.token)
      .then(result => {
        if (result.error) {
          workflow.emit("authError")
        }
        else {
          if (req.body.workflowId) {
            workflow.emit("checkWorkflow", result.userId)
          }
          else {
            workflow.emit("error", "no workflow specified")
          }
        }
      })
  })

  workflow.on("checkWorkflow", (userId) => {
    const workflowRef = doc(db, "workflows", req.body.workflowId)
    getDoc(workflowRef)
      .then(workflowData => {
        if (workflowData.exists()) {
          var found = false
          workflowData.data().users.forEach(user => {
            if (user.id === userId && user.admin) {
              found = true
            }
          })

          if (found) {
            workflow.emit("updateChat")
          }
          else {
            workflow.emit("error", "access restricted")
          }
        }
        else {
          workflow.emit("error", "workflow does not exist")
        }
      })
  })

  workflow.on("updateChat", () => {
    console.log('chatId', req.body.chatId)
    const docRef = doc(db, "chats", req.body.chatId)
    updateDoc(docRef, {customization: req.body.chat})
      .then(chat => {
        workflow.emit("success")
      })
      .catch(err => {
        console.log('error', err.message)
      })
  })

  workflow.on("success", () => {
    res.send(JSON.stringify({error: false}))
  })

  workflow.on("error", (message) => {
    res.send(JSON.stringify({error: true, message}))
  })

  workflow.emit("checkAuth")
}