import { initializeApp } from "firebase/app";
import {getFirestore, getDocs, query, collection, doc, getDoc} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

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

  workflow.on("checkType", () => {
    if (req.body.email && req.body.password) {
      console.log("cheking auth")
      workflow.emit("checkAuth")
    }
    else {
      workflow.emit("fetchWorkflowReg")
    }
  })

  workflow.on("checkAuth", () => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then(user => {
        workflow.emit("fetchWorkflow", user.user.uid)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("fetchWorkflow", (userId) => {
    const docRef = doc(db, "workflows", req.body.workflowId)
    getDoc(docRef)
      .then(workflowData => {
        var found = false
        var admin
        workflowData.data().users.forEach(user => {
          if (user.id === userId) {
            found = true
            admin = user.admin
          }
        })
        if (found && admin) {
          workflow.emit("fetchChat", workflowData.data().chatId)
        }
        else {
          workflow.emit("error", "You do not have access to editing this chat.")
        }
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("fetchWorkflowReg", () => {
    console.log("workflowId", req.body)
    const docRef = doc(db, "workflows", req.body.workflowId)
    getDoc(docRef)
      .then(workflowData => {
        console.log("next step")
        workflow.emit("fetchChatReg", workflowData.data().chatId)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("fetchChat", (chatId) => {
    const docRef = doc(db, "chats", chatId)
    getDoc(docRef)
      .then(chatData => {
        workflow.emit("success", {chatId: chatData.id, ...chatData.data()})
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("fetchChatReg", (chatId) => {
    console.log("fetching")
    const docRef = doc(db, "chats", chatId)
    getDoc(docRef)
      .then(chatData => {
        workflow.emit("success", {chatId: chatData.id, ...chatData.data()})
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("success", (chatData) => {
    console.log("success")
    res.send(JSON.stringify({error: false, chatData}))
  })

  workflow.on("error", (message) => {
    res.send(JSON.stringify({error: true, message}))
  })

  workflow.emit("checkType")
}