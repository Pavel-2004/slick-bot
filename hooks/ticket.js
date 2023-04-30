import {collection, query, where, onSnapshot, getFirestore} from "firebase/firestore";
import {useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {firebaseModule} from "../function/ticket-snapshot"

export const useTicket = (workflowId) => {
  const [tickets, setTickets] = useState([])
  const [adminName, setAdminName] = useState("")
  const [position, setPosition] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [currentUserId, setCurrentUserId] = useState("")

  useEffect(() => {
    if (workflowId) {
      const token = localStorage.getItem("token")
      if (token) {
        firebaseModule.listenToUpdates(token, workflowId, (snapshot) => {
          if (!snapshot.error) {
            setTickets(snapshot.newTickets)
          }
          if (snapshot.error && snapshot.authError) {
            window.location.href = "/login"
          }
        })
      }

      if (token) {
        fetch("/api/auth/get-user", {
          method: "POST",
          headers: {
            'Content-Type' : "application/json"
          },
          body: JSON.stringify({token, workflowId})
        })
          .then(chatInfo => {
            return chatInfo.text()
          })
          .then(chatInfo => {
            return JSON.parse(chatInfo)
          })
          .then(chatInfo => {
            console.log(chatInfo)
            if (chatInfo.error) {
              console.log("error")
              console.log(chatInfo.message)
            }
            else {
              setCurrentUserId(chatInfo.userId)
              setAdminName(chatInfo.name)
              setPosition(chatInfo.position)
            }
          })
      }
      else {
        window.location.href = "/login"
      }
    }
  }, [workflowId])

  const handleBeginChat = (activeChatId) => {
    const token = localStorage.getItem("token")
    fetch("/api/chat/activate-chat", {
      method: "POST",
      headers: {
        'Content-Type' : "application/json"
      },
      body: JSON.stringify({thumbnail, adminName, position, activeChatId, adminId: currentUserId, token, workflowId})
    })
      .then(chatInfo => {
        return chatInfo.text()
      })
      .then(chatInfo => {
        return JSON.parse(chatInfo)
      })
  }

  const handleRejectChat = (activeChatId) => {
    const token = localStorage.getItem("token")
    fetch("/api/chat/reject-chat", {
      method: "POST",
      headers: {
        'Content-Type' : "application/json"
      },
      body: JSON.stringify({activeChatId, token, workflowId})
    })
      .then(chatInfo => {
        return chatInfo.text()
      })
      .then(chatInfo => {
        return JSON.parse(chatInfo)
      })
  }

  return [tickets, currentUserId, handleBeginChat, handleRejectChat]
}

export const useChatNav = (workflowId) => {
  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState()
  const [currentUserId, setCurrentUserId] = useState("")

  useEffect(() => {
    if (currentUserId) {
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

      const workflow = new (require('events').EventEmitter)();
      const token = localStorage.getItem("token")

      if (token) {
        firebaseModule.listenToUpdates(token, workflowId, (snapshot) => {
          if (!snapshot.error) {
            setChats(snapshot.newTickets)
          }
          if (snapshot.error && snapshot.authError) {
            window.location.href = "/login"
          }
        })
      }

    }
  }, [currentUserId])

  useEffect(() => {
    if (workflowId) {
      const token = localStorage.getItem("token")

      if (token) {
        fetch("/api/auth/get-user", {
          method: "POST",
          headers: {
            'Content-Type' : "application/json"
          },
          body: JSON.stringify({token, workflowId})
        })
          .then(chatInfo => {
            return chatInfo.text()
          })
          .then(chatInfo => {
            return JSON.parse(chatInfo)
          })
          .then(chatInfo => {
            if (chatInfo.error) {
              console.log("error")
              console.log(chatInfo.message)
            }
            else {
              setCurrentUserId(chatInfo.userId)
            }
          })
      }
      else {
        window.location.href = "/login"
      }
    }
  }, [workflowId])

  const sendChat = (chatId, content) => {
    fetch("/api/chat/send-chat", {
      method: "POST",
      headers: {
        'Content-Type' : "application/json"
      },
      body: JSON.stringify({content, chatId, from: "admin"})
    })
      .then(chatInfo => {
        return chatInfo.text()
      })
      .then(chatInfo => {
        return JSON.parse(chatInfo)
      })
      .then(chatInfo => {
        console.log(chatInfo.messsage)
      })
  }

  return [chats, currentUserId, sendChat, currentChatId, setCurrentChatId]
}