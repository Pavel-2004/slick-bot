import {useState, useEffect} from "react";
import {initializeApp} from "firebase/app";
import {doc, getFirestore, onSnapshot} from "firebase/firestore";

export const useCustomerChat = (workflowId) => {
  const [customerName, setCustomerName] = useState("")
  const [company, setCompany] = useState("")
  const [issue, setIssue] = useState("")
  const [chat, setChat] = useState("")
  const [chats, setChats] = useState([])
  const [options, setOptions] = useState([])
  const [chatSettings, setChatSettings] = useState({
    nav: {
      logo: "",
      title: "#FFFFFF",
      subtitle: "#B9B6B6",
      background: "#5B6B9E",
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
  })
  const [chatId, setChatId] = useState("")
  const [prechats, setPrechats] = useState([{type: "answer", first: true, id: 1}])
  const [adminPrompt, setAdminPrompt] = useState(0)
  const [totalChats, setTotalChats] = useState(0)
  const [activeChatId, setActiveChatId] = useState("")

  const handleNewOptions = (id) => {
    const newResponses = []
    var addedResponse = false

    prechats.forEach(chat => {
      if (chat.id === id) {
        newResponses.push({type: "text", content: chat.content, from: "user"})
      }
      if (chat.type === "response" && chat.parent === id) {
        addedResponse = true
        newResponses.push({type: "text", content: chat.content, from: "admin"})
      }
    })
    if (!addedResponse) {
      newResponses.push({type: "text", content: "I am sorry, I am not sure...", from: "admin"})
      newResponses.push({type: "text", content: "Would you like to speak to an admin?", from: "admin"})
    }

    setChats([...chats, ...newResponses])

    const newOptions = []
    prechats.forEach(chat => {
      if (chat.type === "answer" && chat.parent === id) {
        newOptions.push({content: chat.content, admin: false, id: chat.id})
      }
    })

    if (newOptions.length === 0) {
      newOptions.push({content: "Speak to an admin", admin: true})
    }
    setOptions(newOptions)
  }

  const handleStartSpeakAdmin = () => {
    const newResponses = []
    newResponses.push({type: "text", content: "Speak to an admin.", from: "user"})
    newResponses.push({type: "text", content: "What is your name?", from: "admin"})
    setAdminPrompt(1)
    setChats([...chats, ...newResponses])
    setChat("")
    setOptions([])
  }

  const handleSend = () => {
    if (adminPrompt === 1) {
      setCustomerName(chat)
      const newResponses = []
      newResponses.push({type: "text", content: chat, from: "user"})
      newResponses.push({type: "text", content: "Can you tell us your company name? Feel free to just press enter if not.", from: "admin"})
      setAdminPrompt(2)
      setChats([...chats, ...newResponses])
    }
    else if (adminPrompt === 2) {
      const newResponses = []
      setCompany(chat)
      newResponses.push({type: "text", content: chat, from: "user"})
      newResponses.push({type: "text", content: "Can you please tell us your issue?", from: "admin"})
      setAdminPrompt(3)
      setChats([...chats, ...newResponses])
    }
    else if (adminPrompt === 3) {
      setIssue(issue)
      if (workflowId) {
        fetch("/api/chat/create-active-chat", {
          method: "POST",
          headers: {
            'Content-Type' : "application/json"
          },
          body: JSON.stringify({workflowId, name: customerName, company, issue: chat})
        })
          .then(chatInfo => {
            return chatInfo.text()
          })
          .then(chatInfo => {
            return JSON.parse(chatInfo)
          })
          .then(chatInfo => {
            if (chatInfo.error) {
            }
            else {
              const newResponses = []
              newResponses.push({type: "text", content: chat, from: "user"})
              newResponses.push({type: "text", content: "Ok we are connecting you to an admin.", from: "admin"})
              setAdminPrompt(4)
              setChats([...chats, ...newResponses])

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
              setAdminPrompt(4)
              setActiveChatId(chatInfo.chatId)
              const activeChatRef = doc(db, "activeChats", chatInfo.chatId)
              onSnapshot(activeChatRef, (chatInfo) => {
                console.log('chatInfo', chatInfo.data(), adminPrompt)
                if (chatInfo.data().status === "accepted") {
                  setAdminPrompt(5)
                }
                if (chatInfo.data().chats.length > 0) {
                  console.log('new chats', chatInfo.data().chats)
                  setChats([...chats, ...chatInfo.data().chats])
                  setTotalChats(totalChats + 1)
                }
              })
            }
          })
      }
    }
    else if (adminPrompt === 4) {
      const newResponses = []
      newResponses.push({type: "text", content: chat, from: "user"})
      newResponses.push({type: "text", content: "Please give me a moment, I am trying to connect you with an admin.", from: "admin"})
      setChats([...chats, ...newResponses])
    }
    else {
      fetch("/api/chat/send-chat", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({content: chat, chatId: activeChatId, from: "user"})
      })
    }
    setChat("")
  }

  console.log('admin prompt', adminPrompt)

  useEffect(() => {
    const localChatSettings = localStorage.getItem("chatSettings")
    if (localChatSettings) {
      const storedChatSettings = JSON.parse(localChatSettings)
      setChatId(storedChatSettings.chatData.id)
      setChatSettings(storedChatSettings.chatData.customization)
      if (storedChatSettings.chatData.prechats) {
        setPrechats([...prechats, ...storedChatSettings.chatData.prechats])
      }
      if (storedChatSettings.chatData.prechats && storedChatSettings.chatData.prechats.length > 0) {
        const newChats = []
        storedChatSettings.chatData.prechats.forEach(chat => {
          if (chat.type === "response" && chat.parent === 1) {
            newChats.push({type: "text", content: chat.content, from: "admin"})
          }
        })
        setChats([...chats,...newChats])

        const newOptions = []
        storedChatSettings.chatData.prechats.forEach(chat => {
          if (chat.type == "answer" && chat.parent === 1) {
            newOptions.push({content: chat.content, admin: false, id: chat.id})
          }
        })
        if (newOptions.length === 0) {
          newOptions.push({content: "Speak to an admin", admin: true})
        }
        setOptions([...options, ...newOptions])
      }
      else {
        const newChats = []
        newChats.push({type: "text", content: "Welcome, would you like to speak to an operator?", from: "admin"})
        setChats([...chats, ...newChats])
        const newOptions = []
        newOptions.push({content: "Speak to an admin", admin: true})
        setOptions([...options, ...newOptions])
      }
    }
  }, [])

  useEffect(() => {
    const localChatSettings = localStorage.getItem("chatSettings")

    if (!localChatSettings && workflowId) {
      fetch("/api/chat/get-chat", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({workflowId})
      })
        .then(chatInfo => {
          return chatInfo.text()
        })
        .then(chatInfo => {
          return JSON.parse(chatInfo)
        })
        .then(chatInfo => {
          console.log({chatInfo})
          if (chatInfo.error) {
            console.log(chatInfo.message)
          }
          else {
            setChatSettings(chatInfo.chatData.customization)
            setChatSettings(chatInfo.chatData.customization)
            if (chatInfo.chatData.prechats && chatInfo.chatData.prechats.length > 0) {
              setPrechats([...prechats, ...chatInfo.chatData.prechats])
              const newChats = []
              chatInfo.chatData.prechats.forEach(chat => {
                if (chat.type == "response" && chat.parent === 1) {
                  newChats.push({type: "text", content: chat.content, from: "admin"})
                }
              })
              setChats([...chats, ...newChats])

              const newOptions = []
              chatInfo.chatData.prechats.forEach(chat => {
                if (chat.type == "answer" && chat.parent === 1) {
                  newOptions.push({content: chat.content, admin: false, id: chat.id})
                }
              })
              if (newOptions.length === 0) {
                newOptions.push({content: "Speak to an admin", admin: true})
              }
              setOptions([...options, ...newOptions])
            }
            else {
              const newChats = []
              newChats.push({type: "text", content: "Welcome, would you like to speak to an operator?", from: "admin"})
              setChats([...chats, ...newChats])
              const newOptions = []
              newOptions.push({content: "Speak to an admin", admin: true})
              setOptions([...options, ...newOptions])
            }
            localStorage.setItem("chatSettings", JSON.stringify(chatInfo))
          }
        })
        .catch(err => {
          console.log(err.message)
        })
    }
  }, [workflowId])

  return [chat, setChat, chats, options, chatSettings, handleNewOptions, handleStartSpeakAdmin, handleSend]
}