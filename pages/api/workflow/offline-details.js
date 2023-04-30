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
  const auth = getAuth(app)

  console.log("here")

  workflow.on('checkAuth', () => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then(user => {
        workflow.emit("getOnlineTeam", user.user.uid)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("getOnlineTeam", (userId) => {
    const q = query(collection(db, "offline"), where("workflowId", "==", req.body.workflowId))
    getDocs(q)
      .then(offlines => {
        const newOfflines = []
        offlines.forEach(offline => {
          const currDate = Math.round(Date.now() / 1000)
          if (offline.data().done >= currDate) {
            newOfflines.push(offline.data().userId)
          }
        })
        workflow.emit("getUsers", newOfflines, userId)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("getUsers", (newOfflines, userId) => {
    console.log("new offline", newOfflines)
    const workflowRef = doc(db, "workflows", req.body.workflowId)
    getDoc(workflowRef)
      .then(workflowData => {
        const users = workflowData.data().users
        const finalUsers = []
        users.forEach(user => {
          if (!newOfflines.includes(user.id)) {
            finalUsers.push(user)
          }
        })
        workflow.emit("success", finalUsers, !newOfflines.includes(userId), userId)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("success", (activeUsers, currentlyActive, userId) => {
    res.send(JSON.stringify({error: false, activeUsers, currentlyActive, userId}))
  })

  workflow.on("error", (message) => {
    res.send(JSON.stringify({error: true, message}))
  })

  workflow.emit("checkAuth")
}