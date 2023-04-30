import {useState, useEffect} from "react";

export const useActive = (workflowId) => {
  const [active, setActive] = useState()
  const [team, setTeam] = useState([])
  const [hours, setHours] = useState(0)
  const [userId, setUserId] = useState()

  useEffect(() => {
    if (workflowId) {
      const email = localStorage.getItem("user")
      const password = localStorage.getItem("password")
      if (email && password) {
        fetch("/api/workflow/offline-details", {
          method: "POST",
          headers: {
            'Content-Type' : "application/json"
          },
          body: JSON.stringify({email, password, workflowId})
        })
          .then(chatInfo => {
            return chatInfo.text()
          })
          .then(chatInfo => {
            return JSON.parse(chatInfo)
          })
          .then(chatInfo => {
            if (chatInfo.error) {
              console.log("handling error")
            }
            else {
              setActive(chatInfo.currentlyActive)
              setTeam(chatInfo.activeUsers)
              setUserId(chatInfo.userId)
            }
          })
      }
      else {
        window.location.href = "/login"
      }
    }
  }, [workflowId])

  const goOnline = () => {
    if (userId && workflowId) {
      fetch("/api/workflow/go-online", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({userId, workflowId})
      })
        .then(activeInfo => {
          return activeInfo.text()
        })
        .then(activeInfo => {
          return JSON.parse(activeInfo)
        })
        .then(activeInfo => {
          if (activeInfo.error) {
            console.log("handle error")
          }
          else {
            setActive(true)
            const newUsers = team
            newUsers.push({id: userId})
            setTeam(newUsers)
          }
        })
    }
  }

  const goOffline = () => {
    if (userId && workflowId) {
      console.log("going offline")
      fetch("/api/workflow/add-user-offline", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({userId, workflowId, hours})
      })
        .then(activeInfo => {
          return activeInfo.text()
        })
        .then(activeInfo => {
          return JSON.parse(activeInfo)
        })
        .then(activeInfo => {
          if (activeInfo.error) {
            console.log("handle error")
          }
          else {
            setActive(false)
            var userIndex
            team.forEach((index, user) => {
              if (user.id === userId) {
                userIndex = index
              }
            })

            if (userIndex !== undefined) {
              const newUsers = team
              newUsers.splice(userIndex, 1)
              setTeam(newUsers)
            }
          }
        })
    }
  }


  return [active, team, hours, setHours, goOnline, goOffline]
}
