import { Server } from 'ws'
import {collection, query, where, onSnapshot, getFirestore, getDoc, doc} from "firebase/firestore";
import {initializeApp} from "firebase/app";
import {getUserIdToken} from "../../../function/checkAuth";
import {getAuth} from "firebase/auth";

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
  const workflow = new (require('events').EventEmitter)();

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
            if (user.id === userId) {
              found = true
            }
          })

          if (found) {
            workflow.emit("createSocket")
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

  workflow.on("createSocket", () => {
    const q = query(collection(db, "activeChats"), where("workflowId", "==", req.body.workflowId))

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newTickets = []
      snapshot.forEach(ticket => {
        newTickets.push({...ticket.data(), chatId: ticket.id})
      })
      res.status(200).json({ newTickets });
    })
  })

  workflow.on("error", (message) => {
    res.send(JSON.stringify({error: true, message}))
  })

  workflow.on("authError", (message) => {
    res.send(JSON.stringify({error: true, auth: true}))
  })

  workflow.emit("checkAuth")
}