import {useEffect, useState} from "react";

export function useChatCustom(workflowId) {
  const [chatSetting, setChatSettings] = useState({
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
  })
  const [chatId, setChatId] = useState("")
  console.log('chatId', chatId)
  useEffect(() => {
    const token = localStorage.getItem("token")

    if (workflowId && token) {
      fetch("/api/auth/check-admin", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({token, workflowId})
      })
        .then(authInfo => {
          return authInfo.text()
        })
        .then(authInfo => {
          return JSON.parse(authInfo)
        })
        .then(authInfo => {
          if (authInfo.error) {
           location.href = "/chat-ticket/" + workflowId
          }
        })

      fetch("/api/chat/get-chat", {
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
            setChatId(chatInfo.chatData.chatId)
            setChatSettings(chatInfo.chatData.customization)
          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [workflowId])

  const updateChatCustom = () => {
    const token = localStorage.getItem("token")

    if (token && workflowId) {
      fetch("/api/chat/update-chat", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({chatId: chatId, chat: chatSetting, token})
      })
        .then(chat => {
          if (chat.error) {
            //handle error
          }
        })
    }
  }

  return [chatSetting, updateChatCustom, setChatSettings]
}

export function usePreChatProgram(workflowId) {
  const [currAnswer, setCurrAnswer] = useState(1)
  const [highestId, setHighestId] = useState(1)
  const [stateCounter, setStateCounter] = useState(0)
  const [prechats, setPrechats] = useState([{type: "answer", first: true, id: 1}])
  const [chatId, setChatId] = useState("")

  const handleBack = () => {
    console.log("handling")
    console.log({currAnswer})
    var parentId
    prechats.forEach(chat => {
      if (chat.id === currAnswer && !chat.first) {
        parentId = chat.parent
      }
    })
    console.log({parentId})
    setCurrAnswer(parentId)
  }

  const handleRemoveChat = (chatIndex) => {
    var index
    var found = false

    prechats.forEach((prechat, preChatIndex) => {
      if (prechat.id === chatIndex) {
        index = preChatIndex
        found = true
      }
    })

    if (found && prechats[index] && !prechats[index].first) {
      setCurrAnswer(1)
      const newPrechats = prechats
      newPrechats.splice(index, 1)
      const token = localStorage.getItem("token")
      if (token && workflowId) {
        fetch("/api/chat/update-prechat", {
          method: "POST",
          headers: {
            'Content-Type' : "application/json"
          },
          body: JSON.stringify({token, workflowId, prechats: [...newPrechats], chatId})
        })
          .then(err => {
            setPrechats(newPrechats)
            setStateCounter(stateCounter + 1)
            //handle error
          })
      }
    }
  }

  const handleAddPrompt = (newResponseInstance) => {
    const token = localStorage.getItem("token")

    if (token && workflowId) {
      fetch("/api/chat/update-prechat", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({token, workflowId, prechats: [...prechats, newResponseInstance], chatId})
      })
        .then(err => {
          //handle error
        })
    }
  }

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (workflowId && token) {
      fetch("/api/auth/check-admin", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({token, workflowId})
      })
        .then(authInfo => {
          return authInfo.text()
        })
        .then(authInfo => {
          return JSON.parse(authInfo)
        })
        .then(authInfo => {
          if (authInfo.error) {
            location.href = "/chat-ticket/" + workflowId
          }
        })

      fetch("/api/chat/get-chat", {
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
          }
          else {
            setChatId(chatInfo.chatData.chatId)

            if (chatInfo.chatData.prechats) {
              setPrechats([...prechats, ...chatInfo.chatData.prechats])
              var currHighestId = highestId
              chatInfo.chatData.prechats.forEach(chat => {
                if (chat.id > currHighestId) {
                  currHighestId = chat.id
                }
              })
              setHighestId(currHighestId)
            }

          }
        })
        .catch(err => {
          console.log(err)
        })
    }
  }, [workflowId])

  return [currAnswer, setCurrAnswer, highestId, setHighestId, stateCounter, setStateCounter, prechats, setPrechats, handleAddPrompt, handleBack, handleRemoveChat]
}