// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {addDoc, collection, getFirestore} from "firebase/firestore";
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
const db = getFirestore(app)

export default function handler(req, res) {

  workflow.on("verifyLogin", () => {
    signInWithEmailAndPassword(auth, req.body.email, req.body.password)
      .then(user => {
        workflow.emit("createToken", user.user.uid)
      })
      .catch(err => {
        workflow.emit("error", err)
      })
  })

  workflow.on("createToken", (userId) => {
    console.log(userId, "userId")
    const currTime = new Date().getTime() / 1000;
    const expires = currTime + 60 * 60 * 48
    addDoc(collection(db, "tokens"), {
      userId,
      expires
    })
      .then(token => {
        workflow.emit("success", token.id)
      })
      .catch(err => {
        workflow.emit("error", err)
      })
  })

  workflow.on("success", (tokenId) => {
    res.send(JSON.stringify({error: false, tokenId}))
  })

  workflow.on("error", (err) => {
    res.send(JSON.stringify({error: true, message: err.message}))
  })

  workflow.emit("verifyLogin")
}