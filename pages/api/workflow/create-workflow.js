import { initializeApp } from "firebase/app";
import { getFirestore, addDoc, collection } from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {getUserIdToken} from "../../../function/checkAuth";

function generateKey() {
  let key = "";
  const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (let i = 0; i < 10; i++) {
    key += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return key;
}

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
          workflow.emit("createChat", result.userId)
        }
      })
  })

  workflow.on("createChat", (userId) => {
    const chatContent = {
      nav: {
        logo: "",
        title: "#FFFFFF",
        subtitle: "#B9B6B6",
        background: "#5B6B9E",
        titleText: "",
        subTitleText: "",
      },
      botTexting: {
        text: "#FFFFFF",
        background: "#5B6B9E",
        border: "#5B6B9E",
      },
      userTexting: {
        text: "#FFFFFF",
        background: "#9AA4CF",
        border: "#9AA4CF",
      },
      userbutton: {
        text: "#FFFFFF",
        background: "#048EFB",
        border: "#048EFB"
      },
      inputSend: {
        text: "#5B6B9E",
        button: "#5B6B9E"
      },
      background: "#EAEAEA"
    }


    addDoc(collection(db, "chats"), {
      customization: chatContent
    })
      .then(chat => {
        workflow.emit("createWorkflow", chat.id, userId)
      })
      .catch(err => {
        workflow.emit("error", err.message)
      })
  })

  workflow.on("createWorkflow", (chatId, userId) => {
    addDoc(collection(db, "workflows"), {
      chatId,
      plan: "",
      users: [{id: userId, admin: true}],
      name: req.body.name,
      userKey: generateKey(),
      authKey: generateKey()
    })
      .then(workFlow => {
        workflow.emit("success", workFlow.id, chatId)
      })
      .catch(err => {
        console.log("weird", err.message)
      })
  })

  workflow.on("success", (workflowId, chatId) => {
    res.send(JSON.stringify({error: false, workflowId, chatId}))
  })

  workflow.on("error", (err) => {
    console.log(err.message)
    res.send(JSON.stringify({error: true, message: err}))
  })

  workflow.emit("checkAuth")
}