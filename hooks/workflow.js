import {useEffect, useState} from "react";

export function useWorflow() {
  const [worflows, setWorkflows] = useState([])
  const [userId, setUserId] = useState()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token) {
      fetch("/api/auth/get-user", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({token})
      })
        .then(userInfo => {
          return userInfo.text()
        })
        .then(userInfo => {
          return JSON.parse(userInfo)
        })
        .then(userInfo => {
          setUserId(userInfo.userId)
        })

      fetch("/api/workflow/get-workflow", {
        method: "POST",
        headers: {
          'Content-Type' : 'application/json'
        },
        body: JSON.stringify({token})
      })
        .then(workflowResponse => {
          console.log(workflowResponse)
          return workflowResponse.text()
        })
        .then(workflowResponse => {
          return JSON.parse(workflowResponse)
        })
        .then(workflowResponse => {
          console.log(workflowResponse)
          if (workflowResponse.error) {

          }
          else {
            setWorkflows(workflowResponse.workflows)
          }
        })
    }
  }, [])

  const addWorkflow = (workflowName, setWorkflowName) => {
    const token = localStorage.getItem("token")

    if (token) {
      console.log("here")
      fetch("/api/workflow/create-workflow", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({token, name: workflowName})
      })
        .then(workflowResponse => {
          return workflowResponse.text()
        })
        .then(workflowResponse => {
          return JSON.parse(workflowResponse)
        })
        .then(workflowResponse => {
          if (workflowResponse.error) {
            console.log("here")
          }
          else {
            setWorkflows([...worflows, {id: workflowResponse.workflowId, chatId: workflowResponse.chatId, name: workflowName, admin: true}])
            setWorkflowName("")
          }
        })
    }
  }


  return [worflows, addWorkflow, userId]
}

export function useConnection(workflowId) {
  const [users, setUsers] = useState([])
  const [newUserEmail, setNewUserEmail] = useState("")
  const [newUserRank, setNewUserRank] = useState("user")
  const [workflowKey, setWorkflowKey] = useState()
  const [workflowUserKey, setWorkflowUserKey] = useState()

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (token && workflowId) {
      fetch("/api/workflow/get-workflow-info", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({token, workflowId})
      })
        .then(workflowResponse => {
          return workflowResponse.text()
        })
        .then(workflowResponse => {
          return JSON.parse(workflowResponse)
        })
        .then(workflowResponse => {
          if (workflowResponse.error) {
            console.log("handling error")
          }
          else {
            setUsers(workflowResponse.workflowData.users)
            if (workflowResponse.workflowData.authKey && workflowResponse.workflowData.userKey) {
              setWorkflowKey(workflowResponse.workflowData.authKey)
              setWorkflowUserKey(workflowResponse.workflowData.userKey)
            }
          }

        })
    }
  }, [workflowId])

  const addUser = () => {
    const email = localStorage.getItem("user")
    const password = localStorage.getItem("password")

    if (email && password && workflowId) {
      console.log("workflow", workflowId)
      fetch("/api/workflow/add-user", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({email, password, workflowId, userEmail: newUserEmail, userRank: newUserRank})
      })
        .then(workflowResponse => {
          return workflowResponse.text()
        })
        .then(workflowResponse => {
          return JSON.parse(workflowResponse)
        })
        .then(workflowResponse => {
          if (workflowResponse.error) {
            console.log("handling error")
          }
          else {
            if (newUserRank === "admin") {
              setUsers([...users, {email: newUserEmail, admin: true}])
            }
            else {
              setUsers([...users, {email: newUserEmail, admin: false}])
            }
            setNewUserEmail("")
            setNewUserRank("user")
          }
        })
    }
  }

  console.log(users)

  return [users, newUserEmail, setNewUserEmail, newUserRank, setNewUserRank, addUser, workflowKey, workflowUserKey]
}