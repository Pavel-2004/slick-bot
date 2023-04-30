import { initializeApp } from "firebase/app";
import {getFirestore, getDocs, query, collection, doc, getDoc} from "firebase/firestore";
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
            if (user.id === userId) {
              found = true
            }
          })

          if (found) {
            workflow.emit("getUser", userId)
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

  workflow.on("getUser", (userId) => {
    getDocs(collection(db, "users"))
      .then(users => {
        const newUsers = {}
        users.forEach(user => {
          newUsers[user.data().userId] = user.data()
        })
        workflow.emit("fetchWorkflow", userId, newUsers)
      })
  })

  workflow.on("fetchWorkflow", (userId, newUsers) => {
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
          const newWorkflowData = workflowData.data()
          const aggerateUser = []
          workflowData.data().users.forEach(user => {
            aggerateUser.push({...user, ...newUsers[user.id]})
          })
          newWorkflowData.users = aggerateUser
          workflow.emit("success", newWorkflowData)
        }
        else {
          workflow.emit("error", "You do not have access to editing this chat.")
        }
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("success", (workflowData) => {
    res.send(JSON.stringify({error: false, workflowData}))
  })

  workflow.on("error", (message) => {
    console.log(message)
    res.send(JSON.stringify({error: true, message}))
  })

  workflow.emit("checkAuth")
}



