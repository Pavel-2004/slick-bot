// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore, addDoc, collection } from "firebase/firestore";

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
  const auth = getAuth(app);
  const db = getFirestore(app);

  workflow.on("verify", () => {
    createUserWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then(user => {
        workflow.emit("createUser", user.user.uid)
      })
      .catch(err => {
        workflow.emit("error", err)
      })
  })

  workflow.on("createUser", (userId) => {
    addDoc(collection(db, "users"), {
      firstName: "",
      lastName: "",
      userId,
      email: req.body.email
    })
      .then(doc => {
        workflow.emit("createToken", userId)
      })
      .catch(err => {
        workflow.emit("error", err)
      })
  })

  workflow.on("createToken", (userId) => {
    addDoc(collection(db, "tokens"), {
      userId,
      expires: new Date().getTime() + 60 * 60 * 48
    })
      .then(token => {
        workflow.on("success", token.id)
      })
      .catch(err => {
        workflow.on("error", err)
      })
  })

  workflow.on("success", (tokenId) => {
    res.send(JSON.stringify({error: false, tokenId}))
  })

  workflow.on("error", (err) => {
    res.send(JSON.stringify({error: true, message: err.message}))
  })

  workflow.emit("verify")
}