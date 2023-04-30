const { WebClient } = require("@slack/web-api")
const slackToken = "xoxb-4322203370662-4327696701845-DSOCrQDNiw2DHivF3fwHbJj9"
const fs = require('fs')
const path = require('path')
const slackClient = new WebClient(slackToken)
import { initializeApp } from "firebase/app";
import {getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword} from "firebase/auth";
import {getFirestore, addDoc, collection, doc, updateDoc, getDocs, getDoc, query, where, writeBatch} from "firebase/firestore";


export default function handler(req, res) {
  const message = req.body.event.text
  const teamId = req.body.team_id
  const channel = req.body.event.channel
  console.log(message, 'message')

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

  workflow.on("checkMessage", () => {
    if (teamId && channel) {
      const splitMessage = message.split(" ")
      //do a check to see if message is coming from an active channelId
      var notActiveChannel = true

      const filePath = path.join(process.cwd(), 'data', 'user.json');
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {

        }
        else {
          fs.readFile(filePath, 'utf-8', (err, data) => {
            if (err) {

            }
            else {
              const json = JSON.parse(data)
              if (json.activeChats && json.activeChats.includes(channel)) {
                notActiveChannel = false
                workflow.emit("sendMessage")
              }
            }
          })
        }
      })


      if (notActiveChannel && splitMessage.length > 0 && splitMessage[0] === "-slick") {
        if (splitMessage.length > 1) {
          if (splitMessage[1] === "login") {
            if (splitMessage.length > 3) {
              const username = splitMessage[2]
              const password = splitMessage[3]

              if (username && password) {
                workflow.emit("checkWorkflow", username, password, splitMessage)
              }
            }
          }
        }
      }
    }
  })

  workflow.on("checkWorkflow", (username, password, splitMessage) => {
    const q = query(collection(db, "workflows"), where("name", "==", username))
    getDocs(q)
      .then(workflowsData => {
        let newWorkflowData = {}
        workflowsData.forEach(workflowData => {
          console.log('name', workflowData.data().name)
          if (workflowData.data().name === username && !workflowData.data().channel) {
            newWorkflowData = {...workflowData.data(), id: workflowData.id}
          }
          const successWorkflowData = {...newWorkflowData.data(), id: newWorkflowData.id}
          if (workflowData.data().channel) {
            if (splitMessage[1] === "login") {
              workflow.emit("sendSlackMessage", successWorkflowData, "You are already logged in.")
            }
            if (splitMessage[2] === "tickets") {
              workflow.emit("getTickets", successWorkflowData)
            }
          }
        })

        if (Object.keys(newWorkflowData).length) {
          workflow.emit("updateWorkflowSlack", newWorkflowData)
        }
        else {
          workflow.emit("error", "No such username")
        }
      })
  })

  workflow.on("updateWorkflowSlack", (workflowData) => {
    const workflowRef = doc(db, "workflows", workflowData.id)
    updateDoc(workflowRef, {
      team: teamId,
      channel: channel
    })
      .then(() => {
        workflow.emit("sendMessageSuccessConnect")
      })
  })

  workflow.on("sendMessageSuccessConnect", () => {
    slackClient.chat.postMessage({channel: channel, text: "You have now successfully connected. Tell all team members to visit the connections page in slick bot in order to finalize connection and allow them to chat with prospects."})
      .then(() => {})
  })

  workflow.on("sendSlackMessage", (workflowData, message) => {
    slackClient.chat.postMessage({channel: workflowData.channel, text: message})
      .then(() => {})
  })

  workflow.on('sendMessage', () => {

  })

  workflow.on("error", (message) => {

  })

  workflow.emit("checkMessage")

  res.send({error: false})
}