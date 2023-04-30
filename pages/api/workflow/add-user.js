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
  const auth = getAuth(app);

  workflow.on("checkAuth", () => {
    console.log('checking auth')
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then(user => {
        workflow.emit("checkUser", user.user.uid)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("checkUser", () => {
    console.log('checking user')
    getDocs(collection(db, "users"))
      .then(users => {
        var found = false
        var userId = ""
        console.log('user email', req.body.userEmail)
        users.forEach(user => {
          if (user.data().email == req.body.userEmail) {
            console.log('found email', user.data().email, user.data().userId)
            found = true
            userId = user.data().userId
          }
        })
        if (found) {
          workflow.emit("getCurrentUsers", userId)
        }
        else {
          workflow.emit("error", "User does not exist")
        }
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("getCurrentUsers", (newUserId) => {
    console.log('new user id', newUserId)
    const docRef = doc(db, "workflows", req.body.workflowId)
    getDoc(docRef)
      .then(workflowRef => {
        const users = workflowRef.data().users
        workflow.emit("updateWorkflow", users, newUserId)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("updateWorkflow", (users, newUserId) => {
    const docRef = doc(db, "workflows", req.body.workflowId)
    const newUsers = users
    if (req.body.userRank === "admin") {
      newUsers.push({id: newUserId, admin: true})
    }
    else {
      newUsers.push({id: newUserId, admin: false})
    }
    updateDoc(docRef, {users: newUsers})
      .then(workflowRef => {
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
    console.log('message', message)
    res.send(JSON.stringify({error: true, message}))
  })

  workflow.emit("checkAuth")
}