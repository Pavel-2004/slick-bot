import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, addDoc, collection, doc, updateDoc, getDocs, getDoc, query, where, writeBatch} from "firebase/firestore";

export default function handler(req, res) {
  const workflow = new (require('events').EventEmitter)();
  workflow.setMaxListeners(1)

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
  const auth = getAuth(app)

  workflow.on("checkAuth", () => {
    console.log(workflow.listenerCount("checkAuth"), 'count')
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then(user => {
        workflow.emit("getWorkflows", user.user.uid)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("getWorkflows", (userId) => {
    const q = query(collection(db, "workflows"))
    getDocs(q)
      .then(workflowsData => {
        const allWorkflows = []
        workflowsData.forEach(workflowData => {
          const users = workflowData.data().users
          var found = false
          users.forEach(user => {
            if (user.id === userId) {
              found = true
            }
          })
          if (found) {
            allWorkflows.push({...workflowData.data(), id: workflowData.id})
          }
        })
        workflow.emit("success", allWorkflows)
      })
  })

  workflow.on("success", (allWorkflows) => {
    res.send(JSON.stringify({error: false, workflows: allWorkflows}))
  })

  workflow.on("error", (messsage) => {
    res.send(JSON.stringify({error: true, messsage}))
  })

  workflow.emit("checkAuth")
}