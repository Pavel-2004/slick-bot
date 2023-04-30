import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {getFirestore, getDocs, query, collection, doc, getDoc} from "firebase/firestore";
import {getUserIdToken} from "../../../function/checkAuth";

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
const db = getFirestore(app)
const auth = getAuth(app);

export default function handler(req, res) {
  workflow.on("verifyLogin", () => {
    getUserIdToken(db, req.body.token)
      .then(result => {
        if (result.error) {
          workflow.emit("authError")
        }
        else {
          if (req.body.workflowId) {
            workflow.emit("getUserWorkflowInfo", result.userId)
          }
          else {
            workflow.emit("success", result.userId)
          }
        }
      })
  })

  workflow.on("getUserWorkflowInfo", (userId) => {
    const docRef = doc(db, "workflows", req.body.workflowId)
    getDoc(docRef)
      .then(workflowInfo => {
        var newUser
        var found = false
        workflowInfo.data().users.forEach(user => {
          if (user.id === userId) {
            found = true
            newUser = user
            newUser.userId = user.id
          }
        })
        if (found) {
          workflow.emit("successWorkflow", (newUser))
        }
        else {
          workflow.emit("error", "You are not a user in this workflow")
        }
      })
      .catch(err => {
        console.log('error', err.message)
        workflow.emit("error", err.message)
      })
  })

  workflow.on("success", (userId) => {
    res.send(JSON.stringify({error: false, userId}))
  })

  workflow.on("successWorkflow", (newUser) => {
    res.send(JSON.stringify({error: false, ...newUser}))
  })

  workflow.on("authError", () => {
    res.send(JSON.stringify({error: true, auth: true}))
  })

  workflow.on("error", (message) => {
    res.send(JSON.stringify({error: true, message}))
  })

  workflow.emit("verifyLogin")
}