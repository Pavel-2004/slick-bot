import {initializeApp} from "firebase/app";
import {collection, doc, getDoc, getFirestore, onSnapshot, query, where} from "firebase/firestore";
import {getAuth} from "firebase/auth";
import {getUserIdToken} from "./checkAuth";

export const firebaseModule = (() => {
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

  const listenToUpdates = (token, workflowId, callback) => {
    const workflow = new (require('events').EventEmitter)();

    workflow.on("checkAuth", () => {
      getUserIdToken(db, token)
        .then(result => {
          if (result.error) {
            workflow.emit("authError")
          }
          else {
            if (workflowId) {
              workflow.emit("checkWorkflow", result.userId)
            }
            else {
              workflow.emit("error", "no workflow specified")
            }
          }
        })
    })


    workflow.on("checkWorkflow", (userId) => {
      const workflowRef = doc(db, "workflows", workflowId)
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
      const q = query(collection(db, "activeChats"), where("workflowId", "==", workflowId))
      onSnapshot(q, (snapshot) => {
        const newTickets = []
        snapshot.forEach(ticket => {
          newTickets.push({...ticket.data(), chatId: ticket.id})
        })
        callback({error: false, newTickets})
      })
    })

    workflow.on("error", (message) => {
      callback({error: true, message})
    })

    workflow.on("authError", () => {
      callback({error: true, authError: true})
    })

    workflow.emit("checkAuth")
  }

  return {
    listenToUpdates
  }
})();