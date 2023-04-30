import { initializeApp } from "firebase/app";
import {getFirestore, getDocs, query, collection} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getUserIdToken} from "../../../function/checkAuth";

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
  const auth = getAuth(app);

  workflow.on("checkAuth", () => {
    console.log('count: ', workflow.listenerCount('checkAuth'))
    getUserIdToken(db, req.body.token)
      .then(result => {
        if (result.error) {
          workflow.emit("error", "failed token")
        }
        else {
          workflow.emit("getWorkflow", result.userId)
        }
      })
  })

  workflow.on("getWorkflow", (userId) => {
    const q = query(collection(db, "workflows"))
    getDocs(q)
      .then(workflows => {
        const finalWorkflows = []
        workflows.forEach(work => {
          work.data().users.forEach(user => {
            if (user.id == userId && user.admin) {
              finalWorkflows.push({...work.data(), admin: true, id: work.id})
            }
            else if(user.id == userId) {
              finalWorkflows.push({...work.data(), admin: false, id: work.id})
            }
          })
        })
        workflow.emit("finalize", finalWorkflows)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("finalize", (workflows) => {
    return res.send(JSON.stringify({error: false, workflows}))
  })

  workflow.on("error", (message) => {
    return res.send(JSON.stringify({error: true, message}))
  })

  workflow.emit("checkAuth")
}