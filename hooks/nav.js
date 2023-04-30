import {useState, useEffect} from "react";

export const useNav = (workflowId) => {
  const [workflows, setWorkflows] = useState([])
  const [displayOptions, setDisplayOptions] = useState(false)

  useEffect(() => {
    const email = localStorage.getItem("user")
    const password = localStorage.getItem("password")

    if (workflowId && email && password) {
      fetch("/api/workflow/get-user-workflow", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({email, password, workflowId})
      })
        .then(workflowInfo => {
          return workflowInfo.text()
        })
        .then(workflowInfo => {
          return JSON.parse(workflowInfo)
        })
        .then(workflowInfo => {
          if (workflowInfo.error) {
            console.log("fetch workflow error")
          }
          else {
            setWorkflows(workflowInfo.workflows)
          }
        })
    }

  }, [workflowId])

  const handleToggleOptions = () => {
    if (displayOptions) {
      setDisplayOptions(false)
    }
    else {
      setDisplayOptions(true)
    }
  }

  const changeWorkflow = (e) => {
    console.log(e.target.value)
    window.location.href = "/chat-ticket/" + e.target.value

  }

  return [workflows, changeWorkflow, displayOptions, handleToggleOptions]
}