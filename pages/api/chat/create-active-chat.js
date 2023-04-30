import { initializeApp } from "firebase/app";
import {getFirestore, getDocs, query, collection, doc, getDoc, addDoc} from "firebase/firestore";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";
const { WebClient } = require("@slack/web-api")
const slackToken = "xoxb-4322203370662-4327696701845-DSOCrQDNiw2DHivF3fwHbJj9"
const slackClient = new WebClient(slackToken)

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

  workflow.on("getIp", () => {
    const ip = req.headers["x-real-ip"] || req.connection.remoteAddress;
    workflow.emit("createActiveChat", ip)
  })

  workflow.on("createActiveChat", (ip) => {
    addDoc(collection(db, "activeChats"), {
      ip,
      name: req.body.name,
      company: req.body.company,
      chats: [],
      workflowId: req.body.workflowId,
      issue: req.body.issue,
      status: "pending",
      thumbnail: "",
      adminName: "",
      description: ""
    })
      .then(activeChat => {
        workflow.emit("getWorkflow", activeChat.id)
      })
      .catch(err => {
        workflow.emit("error")
      })
  })

  workflow.on("getWorkflow", (chatId) => {
    const workflowRef = doc(db, "workflows", req.body.workflowId)
    getDoc(workflowRef)
      .then(workflowData => {
        if (workflowData.data().channel) {
          workflow.emit("sendSlackNotification", workflowData.data().channel, chatId)
        }
      })
  })

  workflow.on("sendSlackNotification", (channelId, chatId) => {
    slackClient.chat.postMessage({
      channel: channelId,
      blocks: [
        {
          "type": "header",
          "text": {
            "type": "plain_text",
            "text": "New Ticket Available!",
            "emoji": true
          }
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Name:*\n" + req.body.name
            },
            {
              "type": "mrkdwn",
              "text": "*Company:*\n" + req.body.company
            }
          ]
        },
        {
          "type": "section",
          "fields": [
            {
              "type": "mrkdwn",
              "text": "*Issue:*\n" + req.body.issue
            },
            {
              "type": "mrkdwn",
              "text": "*View Tickets:*\nhttp://localhost:3000/chat-ticket/" + req.body.workflowId
            }
          ]
        }
      ]
    })
      .then(() => {
        workflow.emit("success", chatId)
      })
  })

  workflow.on("success", (chatId) => {
    res.send(JSON.stringify({error: false, chatId}))
  })

  workflow.on("error", (message) => {
    res.send(JSON.stringify({error: true, message}))
  })

  workflow.emit("getIp")
}