import {useEffect, useState} from "react";
import {useRouter} from "next/router";
import {useNav} from "../../hooks/nav";
export default function () {
  const router = useRouter()
  const { pid } = router.query
  const [workflows, changeWorkflow, displayOptions, handleToggleOptions] = useNav(pid)
  const [iteration, setIteration] = useState(false)
  const [dual, setDual] = useState(false)
  const [currside, setCurrSide] = useState(1)

  const [typeOne, setTypeOne] = useState("text")
  const [typeTwo, setTypeTwo] = useState("text")

  const [contentOne, setContentOne] = useState("")
  const [contentTwo, setContentTwo] = useState("")
  const [colorOne, setColorOne] = useState("#000000")
  const [colorTwo, setColorTwo] = useState("#000000")
  const [placeholderOne, setPlaceholderOne] = useState("")
  const [placeholderTwo, setPlaceholderTwo] = useState("")
  const [backgroundOne, setBackgroundOne] = useState("#D9D9D9")
  const [backgroundTwo, setBackgroundTwo] = useState("#D9D9D9")
  const [variableNameOne, setVariableNameOne] = useState("")
  const [variableNameTwo, setVariableNameTwo] = useState("")
  const [urlOne, setUrlOne] = useState("")
  const [urlTwo, setUrlTwo] = useState("")
  const [error ,setError] = useState("")

  const [buttonTypeOne, setButtonTypeOne] = useState("redirect")
  const [buttonTypeTwo, setButtonTypeTwo] = useState("redirect")

  const [emailOne, setEmailOne] = useState("")
  const [emailTwo, setEmailTwo] = useState("")

  const [subjectOne, setSubjectOne] = useState("")
  const [subjectTwo, setSubjectTwo] = useState("")

  const [bodyOne, setBodyOne] = useState("")
  const [bodyTwo, setBodyTwo] = useState("")

  const [keyOne, setKeyOne] = useState("")
  const [keyTwo, setKeyTwo] = useState("")

  const [valueOne, setValueOne] = useState("")
  const [valueTwo, setValueTwo] = useState("")

  const [allVariablesOne, setAllVariablesOne] = useState([])
  const [allVariablesTwo, setAllVariablesTwo] = useState([])

  useEffect(() => {
    const token = localStorage.getItem("token")

    if (pid && token) {
      fetch("/api/auth/check-admin", {
        method: "POST",
        headers: {
          'Content-Type' : "application/json"
        },
        body: JSON.stringify({token, workflowId: pid})
      })
        .then(authInfo => {
          return authInfo.text()
        })
        .then(authInfo => {
          return JSON.parse(authInfo)
        })
        .then(authInfo => {
          if (authInfo.error) {
            location.href = "/chat-ticket/" + pid
          }
        })
    }
  }, [])

  const [widget, setWidget] = useState({
    backgroundColor: "#5B6B9E",
    handling: [

    ],
    success: [

    ],
    error: [

    ]
  })

  const handleEnableIteration = () => {
    setError("")
    if (iteration) {
      setIteration(false)
      return
    }
    if (typeOne === "input" || typeTwo === "input") {
      setError("Can not iterate input")
      return
    }

    setIteration(true)
    setCurrSide(1)
    setContentTwo("")
    setColorTwo("#000000")
    setPlaceholderTwo("")
    setBackgroundTwo("#D9D9D9")
    setVariableNameTwo("")
    setUrlTwo("")
    setButtonTypeTwo("redirect")
    setEmailTwo("")
    setSubjectTwo("")
    setBodyTwo("")
    setKeyTwo("")
    setValueTwo("")
    setAllVariablesTwo([])
  }

  const handleMakeDual = () => {
    setError("")
    setDual(!dual)
  }

  const handleChangeTypeOne = (e) => {
    setContentOne("")
    setColorOne("#000000")
    setPlaceholderOne("")
    setBackgroundOne("#D9D9D9")
    setVariableNameOne("")
    setUrlOne("")
    setButtonTypeOne("redirect")
    setEmailOne("")
    setSubjectOne("")
    setBodyOne("")
    setKeyOne("")
    setValueOne("")
    setAllVariablesOne([])

    setTypeOne(e.target.value)
  }

  const handleChangeTypeTwo = (e) => {
    setContentTwo("")
    setColorTwo("#000000")
    setPlaceholderTwo("")
    setBackgroundTwo("#D9D9D9")
    setVariableNameTwo("")
    setUrlTwo("")
    setButtonTypeTwo("redirect")
    setEmailTwo("")
    setSubjectTwo("")
    setBodyTwo("")
    setKeyTwo("")
    setValueTwo("")
    setAllVariablesTwo([])

    setTypeTwo(e.target.value)
  }

  const handleAddValueOne = () => {
    console.log([...allVariablesOne, [keyOne, valueOne]])
    setAllVariablesOne([...allVariablesOne, [keyOne, valueOne]])
    setKeyOne("")
    setValueOne("")
  }

  const handleAddValueTwo = () => {
    setAllVariablesTwo([...allVariablesTwo, [keyTwo, valueTwo]])
    setKeyTwo("")
    setValueTwo("")
  }

  const handleSwitchButtonOne = (e) => {
    setUrlOne("")
    setEmailOne("")
    setSubjectOne("")
    setBodyOne("")
    setKeyOne("")
    setValueOne("")
    setAllVariablesOne([])

    setButtonTypeOne(e.target.value)
  }

  const handleSwitchButtonTwo = (e) => {
    setUrlTwo("")
    setEmailTwo("")
    setSubjectTwo("")
    setBodyTwo("")
    setKeyTwo("")
    setValueTwo("")
    setAllVariablesTwo([])

    setButtonTypeTwo(e.target.value)
  }

  const handleAddWidget = () => {
    console.log(allVariablesOne)

    const newWidgets = widget
    const newLayer = {}

    if (iteration) {
      newLayer.iterator = true
    }

    if (dual) {
      newLayer.split = true
      newLayer.item = []

      if (typeOne === "input") {
        const newItem = {}
        newItem.type = "input"
        newItem.placeholder = placeholderOne
        newItem.variableOne = variableNameOne
        newItem.backgroundColor = backgroundOne
        newItem.color = colorOne
        newLayer.item.push(newItem)
      }
      if (typeOne === "image") {
        const newItem = {}
        newItem.type = "image"
        newItem.url = urlOne
        newLayer.item.push(newItem)
      }
      if (typeOne === "text") {
        const newItem = {}
        newItem.type = "text"
        newItem.content = contentOne
        newItem.color = colorOne
        newLayer.item.push(newItem)
      }
      if (typeOne === "divide") {
        const newItem = {}
        newItem.type = "divide"
        newItem.color = colorOne
        newLayer.item.push(newItem)
      }
      if (typeOne === "button") {
        const newItem = {}
        newItem.type = "button"
        newItem.content = contentOne
        newItem.backgroundColor = backgroundOne
        newItem.color = colorOne

        if (buttonTypeOne === "redirect") {
          newItem.action = {}
          newItem.action.url = urlOne
        }

        if (buttonTypeOne === "email") {
          newItem.action = {}
          newItem.action.email = emailOne
          newItem.action.subject = subjectOne
          newItem.action.body = bodyOne
        }

        if (buttonTypeOne === "api") {
          newItem.action = {}
          newItem.action.url = urlOne
          newItem.action.variables = allVariablesOne
        }

        newLayer.item.push(newItem)
      }
      if (typeOne === "input") {
        const newItem = {}
        newItem.type = "input"
        newItem.placeholder = placeholderOne
        newItem.variableName = variableNameOne
        newItem.backgroundColor = backgroundOne
        newItem.color = colorOne

        newLayer.item.push(newItem)
      }

      if (typeTwo === "input") {
        const newItem = {}
        newItem.type = "input"
        newItem.placeholder = placeholderTwo
        newItem.variableOne = variableNameTwo
        newItem.backgroundColor = backgroundTwo
        newItem.color = colorTwo
        newLayer.item.push(newItem)
      }
      if (typeTwo === "image") {
        const newItem = {}
        newItem.type = "image"
        newItem.url = urlTwo
        newLayer.item.push(newItem)
      }
      if (typeTwo === "text") {
        const newItem = {}
        newItem.type = "text"
        newItem.content = contentTwo
        newItem.color = colorTwo
        newLayer.item.push(newItem)
      }
      if (typeTwo === "divide") {
        const newItem = {}
        newItem.type = "divide"
        newItem.color = colorTwo
        newLayer.item.push(newItem)
      }
      if (typeTwo === "button") {
        const newItem = {}
        newItem.type = "button"
        newItem.content = contentTwo
        newItem.backgroundColor = backgroundTwo
        newItem.color = colorTwo
        if (buttonTypeTwo === "redirect") {
          newItem.action = {}
          newItem.action.type = "redirect"
          newItem.action.url = urlTwo
        }

        if (buttonTypeTwo === "email") {
          newItem.action = {}
          newItem.action.type = "email"
          newItem.action.email = emailTwo
          newItem.action.subject = subjectTwo
          newItem.action.body = bodyTwo
        }

        if (buttonTypeTwo === "api") {
          newItem.action = {}
          newItem.action.type = "api"
          newItem.action.url = urlTwo
          newItem.action.variables = {}
          newItem.action.variables = allVariablesOne
        }

        newLayer.item.push(newItem)
      }
      if (typeTwo === "input") {
        const newItem = {}
        newItem.type = "input"
        newItem.placeholder = placeholderTwo
        newItem.variableName = variableNameTwo
        newItem.backgroundColor = backgroundTwo
        newItem.color = colorTwo

        newLayer.item.push(newItem)
      }
      newWidgets.handling.push(newLayer)
    }
    else {
      newLayer.split = false
      newLayer.item = []

      if (typeOne === "input") {
        const newItem = {}
        newItem.type = "input"
        newItem.placeholder = placeholderOne
        newItem.variableOne = variableNameOne
        newItem.backgroundColor = backgroundOne
        newItem.color = colorOne
        newLayer.item.push(newItem)
      }
      if (typeOne === "image") {
        const newItem = {}
        newItem.type = "image"
        newItem.url = urlOne
        newLayer.item.push(newItem)
      }
      if (typeOne === "text") {
        const newItem = {}
        newItem.type = "text"
        newItem.content = contentOne
        newItem.color = colorOne
        newLayer.item.push(newItem)
      }
      if (typeOne === "divide") {
        const newItem = {}
        newItem.type = "divide"
        newItem.color = colorOne
        newLayer.item.push(newItem)
      }
      if (typeOne === "button") {
        const newItem = {}
        newItem.type = "button"
        if (buttonTypeOne === "redirect") {
          newItem.action = {}
          newItem.action.type = "redirect"
          newItem.action.url = urlOne
        }

        if (buttonTypeOne === "email") {
          newItem.action = {}
          newItem.action.type = "email"
          newItem.action.email = emailOne
          newItem.action.subject = subjectOne
          newItem.action.body = bodyOne
        }

        if (buttonTypeOne === "api") {
          newItem.action = {}
          newItem.action.type = "api"
          newItem.action.url = urlOne
          newItem.action.variables = {}
          newItem.action.variables = allVariablesOne
        }

        newLayer.item.push(newItem)
      }
      if (typeOne === "input") {
        const newItem = {}
        newItem.type = "input"
        newItem.placeholder = placeholderOne
        newItem.variableName = variableNameOne
        newItem.backgroundColor = backgroundOne
        newItem.color = colorOne

        newLayer.item.push(newItem)
      }
      newWidgets.handling.push(newLayer)
    }

    setWidget(newWidgets)
    setIteration(false)
    setCurrSide(1)
    setContentTwo("")
    setColorTwo("#000000")
    setPlaceholderTwo("")
    setBackgroundTwo("#D9D9D9")
    setVariableNameTwo("")
    setUrlTwo("")
    setButtonTypeTwo("redirect")
    setEmailTwo("")
    setSubjectTwo("")
    setBodyTwo("")
    setKeyTwo("")
    setValueTwo("")
    setAllVariablesTwo([])
    setContentOne("")
    setColorOne("#000000")
    setPlaceholderOne("")
    setBackgroundOne("#D9D9D9")
    setVariableNameOne("")
    setUrlOne("")
    setButtonTypeOne("redirect")
    setEmailOne("")
    setSubjectOne("")
    setBodyOne("")
    setKeyOne("")
    setValueOne("")
    setAllVariablesOne([])
  }

  const handleCreatWidget = () => {
    fetch("/api/workflow/create-widget", {
      method: "POST",
      headers: {
        'Content-Type' : "application/json"
      },
      body: JSON.stringify({workflowId: pid, widget})
    })
      .then(widgetInfo => {
        return widgetInfo.text()
      })
      .then(widgetInfo => {
        return JSON.parse(widgetInfo)
      })
      .then(widgetInfo => {
        if (widgetInfo.error) {
          console.log(widgetInfo.message)
        }
        else {
          setWidget({
            backgroundColor: "#5B6B9E",
            handling: [

            ],
            success: [

            ],
            error: [

            ]
          })
        }
      })
  }

  return (
    <>
      <div className={"fixed top-0 left-0 w-full z-10 bg-nav flex flex-col"}>
        <div className={"lg:hidden w-full bg-black bg-nav flex flex-row justify-between"}>
          <p className={"text-white text-lg ml-2 nav-text"}>SlickBot</p>
          <div className={"flex flex-row h-full my-auto"}>
            <button
              onClick={() => {
                window.location.href = "/chat/" + pid
              }
              }
              className={"p-1 nav-text h-full text-sm ml-2 mr-2"}>Chat</button>
            <button
              onClick={() => {
                window.location.href = "/chat-ticket/" + pid
              }
              }
              className={"p-1 nav-text h-full text-sm ml-2 mr-2"}>tickets</button>
            <button onClick={handleToggleOptions} className={"nav-text p-1 text-white h-full text-sm ml-2 mr-2"}>options</button>
          </div>
        </div>
        <div className={"lg:hidden w-full bg-nav flex flex-row pl-1 " + (displayOptions ? "" : "curved-bottom-corners")}>
          <select onChange={changeWorkflow} className={"nav-select"} value={pid}>
            {
              workflows.map(workflow => {
                return (
                  <option value={workflow.id}>{workflow.name}</option>
                )
              })
            }
          </select>
        </div>
        {
          displayOptions && (
            <div className={"lg:hidden bg-nav flex flex-col curved-bottom-corners"}>
              <a href={"/availability/" + pid}><p className={"text-white text-sm ml-2 nav-text"}>availability</p></a>
              <a href={"/chat-customization/" + pid}><p className={"text-white text-sm ml-2 nav-text"}>chat customization</p></a>
              <a href={"/chat-ticket/" + pid}><p className={"text-white text-sm ml-2 nav-text"}>chat ticket</p></a>
              <a href={"/connection/" + pid}><p className={"text-white text-sm ml-2 nav-text"}>connection</p></a>
              <a href={"/widget-creator/" + pid}><p className={"text-white text-sm ml-2 nav-text"}>widget creator</p></a>
            </div>
          )
        }
        <div className={"hidden w-full bg-black bg-nav lg:flex flex-row justify-between " + (displayOptions ? "" : "curved-bottom-corners")}>
          <p className={"text-white text-3xl ml-5 nav-text"}>SlickBot</p>
          <div className={"flex flex-row h-full my-auto h-full"}>
            <button
              onClick={() => {
                window.location.href = "/chat/" + pid
              }
              }
              className={"p-1 nav-text h-full text-2xl ml-2 mr-2"}>Chat</button>
            <button
              onClick={() => {
                window.location.href = "/chat-ticket/" + pid
              }
              }
              className={"p-1 nav-text h-full text-2xl ml-2 mr-2"}>tickets</button>
            <button onClick={handleToggleOptions} className={"nav-text p-1 text-white h-full text-2xl ml-2 mr-2"}>options</button>
          </div>
          <div className={"flex flex-row h-full my-auto h-full"}>
            <select onChange={changeWorkflow} className={"nav-select mr-2"} value={pid}>
              {
                workflows.map(workflow => {
                  return (
                    <option value={workflow.id}>{workflow.name}</option>
                  )
                })
              }
            </select>
            <div className={"bg-white h-full aspect-square p-4 my-auto mr-2 circle"}></div>
          </div>
        </div>
        {
          displayOptions && (
            <div className={"hidden bg-nav lg:flex flex-col justify-between curved-bottom-corners"}>
              <a href={"/availability/" + pid}><p className={"text-white text-md ml-5 nav-text"}>availability</p></a>
              <a href={"/chat-customization/" + pid}><p className={"text-white text-md ml-5 nav-text"}>chat customization</p></a>
              <a href={"/chat-ticket/" + pid}><p className={"text-white text-md ml-5 nav-text"}>chat ticket</p></a>
              <a href={"/connection/" + pid}><p className={"text-white text-md ml-5 nav-text"}>connection</p></a>
              <a href={"/widget-creator/" + pid}><p className={"text-white text-md ml-5 nav-text"}>widget creator</p></a>
            </div>
          )
        }
      </div>
      <div className={"min-h-screen max-w-full flex flex-col primary-background"}>
        <div className={"flex flex-col"}>
          <div className={"w-full flex flex-row justify-between curved-bottom-corners p-5"}>
          </div>
        </div>
        <div className={"flex lg:hidden flex flex-row justify-center pt-20 p-1"}>
          <p>Kindly, login from a desktop or tablet to access the widget creator.</p>
        </div>
        <div className={"hidden flex-1 lg:flex flex-row max-w-full"}>
          <div className={"flex flex-1 flex-row mt-10 mb-10 pl-10 pr-10"}>
            <div className={"flex flex-1"}>
              <div className={"w-full flex flex-col justify-between secondary-background curved-all card-background outer-shadow"}>
                <div>
                  <div className={"w-full flex flex-col p-5"}>
                    <p className={"card-title text-sm purple-border-bottom p-2"}>Widget Diagram</p>
                  </div>
                  <div className={"w-full flex flex-col mt-2"}>
                    {
                      widget.handling && widget.handling.map(layer => {
                        return (
                          <>
                            <div className={"flex w-full flex-col pl-5 pr-5"}>
                              {layer.iterator && (
                                <p className={"card-title text-sm"}>ITERATOR</p>
                              )}
                              {!layer.iterator && (
                                <p className={"card-title text-sm"}>NONE ITERATOR</p>
                              )}
                              {layer.split && (
                                <div className={"flex flex-row"}>
                                  <div className={"ml-2 bg-nav flex flex-1 flex-col"}>
                                    {layer.item && layer.item[0] && layer.item[0].type === "input" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Placeholder: {layer.item[0].placeholder}
                                        </p>
                                        <p className={"nav-text"}>
                                          Variable Name: {layer.item[0].variableName}
                                        </p>
                                        <p className={"nav-text"}>
                                          Background: {layer.item[0].backgroundColor}
                                        </p>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[0].color}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[0] && layer.item[0].type === "image" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Image URL: {layer.item[0].url}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[0] && layer.item[0].type === "text" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Content: {layer.item[0].content}
                                        </p>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[0].color}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[0] && layer.item[0].type === "divide" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[0].color}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[0] && layer.item[0].type === "button" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Text: {layer.item[0].content}
                                        </p>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[0].color}
                                        </p>
                                        <p className={"nav-text"}>
                                          Background: {layer.item[0].backgroundColor}
                                        </p>
                                        {layer.item[0].action && layer.item[0].action === "redirect" && (
                                          <>
                                            <p className={"nav-text"}>
                                              Type: Redirection
                                            </p>
                                            <p className={"nav-text"}>
                                              URL: {layer.item[0].action.url}
                                            </p>
                                          </>
                                        )}
                                        {layer.item[0].action && layer.item[0].action === "email" && (
                                          <>
                                            <p className={"nav-text"}>
                                              Type: Email
                                            </p>
                                            <p className={"nav-text"}>
                                              Email: {layer.item[0].action.email}
                                            </p>
                                            <p className={"nav-text"}>
                                              Subject: {layer.item[0].action.subject}
                                            </p>
                                            <p className={"nav-text"}>
                                              Body: {layer.item[0].action.body}
                                            </p>
                                          </>
                                        )}
                                        {layer.item[0].action && layer.item[0].action === "api" && (
                                          <>
                                            <p className={"nav-text"}>
                                              Type: API
                                            </p>
                                            <p className={"nav-text"}>
                                              URL: {layer.item[0].action.url}
                                            </p>
                                            {layer.item[0].action.variables && layer.item[0].action.variables.map(variable => {
                                              return (
                                                <p className={"mr-4"}>{variable[0]}: {variable[1]}</p>
                                              )
                                            })}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </div>
                                  <div className={"mr-2 bg-nav p-2"}>
                                    {layer.item && layer.item[1] && layer.item[1].type === "input" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Placeholder: {layer.item[1].placeholder}
                                        </p>
                                        <p className={"nav-text"}>
                                          Variable Name: {layer.item[1].variableName}
                                        </p>
                                        <p className={"nav-text"}>
                                          Background: {layer.item[1].backgroundColor}
                                        </p>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[1].color}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[1] && layer.item[1].type === "image" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Placeholder: {layer.item[1].url}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[1] && layer.item[1].type === "text" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Content: {layer.item[1].content}
                                        </p>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[1].color}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[1] && layer.item[1].type === "divide" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[1].color}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[1] && layer.item[1].type === "button" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Text: {layer.item[1].content}
                                        </p>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[1].color}
                                        </p>
                                        <p className={"nav-text"}>
                                          Background: {layer.item[1].backgroundColor}
                                        </p>
                                        {layer.item[1].action && layer.item[1].action.type === "redirect" && (
                                          <>
                                            <p className={"nav-text"}>
                                              Type: Redirection
                                            </p>
                                            <p className={"nav-text"}>
                                              URL: {layer.item[1].action.url}
                                            </p>
                                          </>
                                        )}
                                        {layer.item[1].action && layer.item[1].action.type === "email" && (
                                          <>
                                            <p className={"nav-text"}>
                                              Type: Email
                                            </p>
                                            <p className={"nav-text"}>
                                              Email: {layer.item[1].action.email}
                                            </p>
                                            <p className={"nav-text"}>
                                              Subject: {layer.item[1].action.subject}
                                            </p>
                                            <p className={"nav-text"}>
                                              Body: {layer.item[1].action.body}
                                            </p>
                                          </>
                                        )}
                                        {layer.item[1].action && layer.item[1].action.type === "api" && (
                                          <>
                                            <p className={"nav-text"}>
                                              Type: API
                                            </p>
                                            <p className={"nav-text"}>
                                              URL: {layer.item[1].action.email}
                                            </p>
                                            <p className={"nav-text"}>
                                              Variables:
                                            </p>
                                            {layer.item[1].action.variables && layer.item[1].action.variables.map(variable => {
                                              return (
                                                <p className={"mr-4"}>{variable[0]}: {variable[1]}</p>
                                              )
                                            })}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                              {!layer.split && (
                                <div className={"flex flex-row"}>
                                  <div className={"ml-2 bg-nav flex flex-1 flex-col"}>
                                    {layer.item && layer.item[0] && layer.item[0].type === "input" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Placeholder: {layer.item[0].placeholder}
                                        </p>
                                        <p className={"nav-text"}>
                                          Variable Name: {layer.item[0].variableName}
                                        </p>
                                        <p className={"nav-text"}>
                                          Background: {layer.item[0].backgroundColor}
                                        </p>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[0].color}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[0] && layer.item[0].type === "image" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Placeholder: {layer.item[0].url}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[0] && layer.item[0].type === "text" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Content: {layer.item[0].content}
                                        </p>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[0].color}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[0] && layer.item[0].type === "divide" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[0].color}
                                        </p>
                                      </>
                                    )}
                                    {layer.item && layer.item[0] && layer.item[0].type === "button" && (
                                      <>
                                        <p className={"nav-text"}>
                                          Text: {layer.item[0].text}
                                        </p>
                                        <p className={"nav-text"}>
                                          Color: {layer.item[0].color}
                                        </p>
                                        <p className={"nav-text"}>
                                          Background: {layer.item[0].backgroundColor}
                                        </p>
                                        {layer.item[0].action && layer.item[0].action.type === "redirect" && (
                                          <>
                                            <p className={"nav-text"}>
                                              Type: Redirection
                                            </p>
                                            <p className={"nav-text"}>
                                              URL: {layer.item[0].action.url}
                                            </p>
                                          </>
                                        )}
                                        {layer.item[0].action && layer.item[0].action.type === "email" && (
                                          <>
                                            <p className={"nav-text"}>
                                              Type: Email
                                            </p>
                                            <p className={"nav-text"}>
                                              Email: {layer.item[0].action.email}
                                            </p>
                                            <p className={"nav-text"}>
                                              Subject: {layer.item[0].action.subject}
                                            </p>
                                            <p className={"nav-text"}>
                                              Body: {layer.item[0].action.body}
                                            </p>
                                          </>
                                        )}
                                        {layer.item[0].action && layer.item[0].action.type === "api" && (
                                          <>
                                            <p className={"nav-text"}>
                                              Type: API
                                            </p>
                                            <p className={"nav-text"}>
                                              URL: {layer.item[0].action.email}
                                            </p>
                                            <p className={"nav-text"}>
                                              Variables:
                                            </p>
                                            {layer.item[0].action.variables && layer.item[0].action.variables.map(variable => {
                                              return (
                                                <p className={"mr-4"}>{variable[0]}: {variable[1]}</p>
                                              )
                                            })}
                                          </>
                                        )}
                                      </>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </>
                        )
                      })
                    }
                  </div>
                </div>
                <div className={"flex flex-row justify-end p-2"}>
                  <button onClick={handleCreatWidget} className={"option-color text-white p-1"}>CREATE WIDGET</button>
                </div>
              </div>
            </div>
          </div>
          <div className={"flex flex-1 flex-row mt-10 mb-10 pl-10 pr-10"}>
            <div className={"flex flex-1"}>
              <div className={"w-full flex flex-col secondary-background curved-all card-background outer-shadow"}>
                <div className={"w-full flex flex-col p-5"}>
                  <p className={"card-title text-sm purple-border-bottom p-2"}>Widget Create</p>
                  <div className={"flex flex-row mt-2"}>
                    <button onClick={handleEnableIteration} className={"p-2 circle aspect-square my-auto border-2 " + (iteration ? "bg-green-500" : "")}></button>
                    <p className={"nav-text text-md ml-2"}>Will this layer be iterated?</p>
                  </div>
                  <div className={"flex flex-row mt-2"}>
                    <button onClick={handleMakeDual} className={"p-2 circle aspect-square my-auto border-2 " + (dual ? "bg-green-500" : "")}></button>
                    <p className={"nav-text text-md ml-2"}>Will this layer contain two elements?</p>
                  </div>
                  <div className={"mt-2 purple-border-bottom"}></div>
                  {
                    dual && (
                      <div className={"mt-2 flex flex-row"}>
                        <button onClick={() => {setCurrSide(1)}} className={"flex flex-1 flex-row justify-center p-2 " + (currside === 1 ? "option-color" : "")}>
                          LEFT
                        </button>
                        <button onClick={() => {setCurrSide(2)}} className={"flex flex-1 flex-row justify-center p-2 " + (currside === 2 ? "option-color" : "") }>
                          RIGHT
                        </button>
                      </div>
                    )
                  }
                  <div className={"flex flex-row"}>
                    <p className={"card-title text-sm"}>Select Type:</p>
                  </div>
                  {
                    currside === 1 && (
                      <div className={"flex flex-1"}>
                        <select onChange={handleChangeTypeOne} value={typeOne} className={"purple-input p-1 flex-1"} >
                          <option value={"text"}>Text</option>
                          <option value={"image"}>Image</option>
                          {
                            !iteration && (
                              <option value={"input"}>Input</option>
                            )
                          }
                          <option value={"divide"}>Divide</option>
                          <option value={"button"}>Button</option>
                        </select>
                      </div>
                    )
                  }
                  {
                    currside === 2 && (
                      <div className={"flex flex-1"}>
                        <select onChange={handleChangeTypeTwo} value={typeTwo} className={"purple-input p-1 flex-1"} >
                          <option value={"text"}>Text</option>
                          <option value={"image"}>Image</option>
                          {
                            !iteration && (
                              <option value={"input"}>Input</option>
                            )
                          }
                          <option value={"divide"}>Divide</option>
                          <option value={"button"}>Button</option>
                        </select>
                      </div>
                    )
                  }
                  {
                    currside === 1 && typeOne === "text" && (
                      <>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Text Content</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input onChange={e => setContentOne(e.target.value)} value={contentOne} className={"flex-1 purple-input p-1"} placeholder={"Text Content"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Text Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setColorOne(e.target.value)} value={colorOne} className={"flex-1 purple-input p-1"} placeholder={"Color"} />
                        </div>
                      </>
                    )
                  }
                  {
                    currside === 2 && typeTwo === "text" && (
                      <>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Text Content</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input onChange={e => setContentTwo(e.target.value)} value={contentTwo} className={"flex-1 purple-input p-1"} placeholder={"Text Content"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Text Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setColorTwo(e.target.value)} value={colorTwo} className={"flex-1 purple-input p-1"} placeholder={"Color"} />
                        </div>
                      </>
                    )
                  }
                  {
                    currside === 1 && typeOne === "input" && (
                      <>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Input</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input onChange={e => setPlaceholderOne(e.target.value)} value={placeholderOne} className={"flex-1 purple-input p-1"} placeholder={"Text Content"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Variable Name</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input onChange={e => setVariableNameOne(e.target.value)} value={variableNameOne} className={"flex-1 purple-input p-1"} placeholder={"Text Content"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setColorOne(e.target.value)} value={colorOne} className={"flex-1 purple-input p-1"} placeholder={"Input Text Color"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Background Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setBackgroundOne(e.target.value)} value={backgroundOne} className={"flex-1 purple-input p-1"} placeholder={"Background Color"} />
                        </div>
                      </>
                    )
                  }
                  {
                    currside === 2 && typeTwo === "input" && (
                      <>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Input</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input onChange={e => setPlaceholderTwo(e.target.value)} value={placeholderTwo} className={"flex-1 purple-input p-1"} placeholder={"Text Content"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Variable Name</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input onChange={e => setVariableNameTwo(e.target.value)} value={variableNameTwo} className={"flex-1 purple-input p-1"} placeholder={"Text Content"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setColorTwo(e.target.value)} value={colorTwo} className={"flex-1 purple-input p-1"} placeholder={"Input Text Color"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Background Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setBackgroundTwo(e.target.value)} value={backgroundTwo} className={"flex-1 purple-input p-1"} placeholder={"Background Color"} />
                        </div>
                      </>
                    )
                  }
                  {
                    currside === 1 && typeOne === "image" && (
                      <>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Image Url</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input onChange={e => setUrlOne(e.target.value)} value={urlOne} className={"flex-1 purple-input p-1"} placeholder={"URL"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Text Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setColorOne(e.target.value)} value={colorOne} className={"flex-1 purple-input p-1"} placeholder={"Color"} />
                        </div>
                      </>
                    )
                  }
                  {
                    currside === 2 && typeTwo === "image" && (
                      <>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Image Url</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input onChange={e => setUrlTwo(e.target.value)} value={urlTwo} className={"flex-1 purple-input p-1"} placeholder={"URL"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Text Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setColorTwo(e.target.value)} value={colorTwo} className={"flex-1 purple-input p-1"} placeholder={"Color"} />
                        </div>
                      </>
                    )
                  }
                  {
                    currside === 1 && typeOne === "divide" && (
                      <>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Divide</p>
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Divide Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setColorOne(e.target.value)} value={colorOne} className={"flex-1 purple-input p-1"} placeholder={"Color"} />
                        </div>
                      </>
                    )
                  }
                  {
                    currside === 2 && typeTwo === "divide" && (
                      <>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Divide</p>
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Divide Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setColorTwo(e.target.value)} value={colorTwo} className={"flex-1 purple-input p-1"} placeholder={"Color"} />
                        </div>
                      </>
                    )
                  }
                  {
                    currside === 1 && typeOne === "button" && (
                      <>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Button</p>
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Text Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setColorOne(e.target.value)} value={colorOne} className={"flex-1 purple-input p-1"} placeholder={"Color"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Background Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setBackgroundOne(e.target.value)} value={backgroundOne} className={"flex-1 purple-input p-1"} placeholder={"Background Color"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Button Text</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input onChange={e => setContentOne(e.target.value)} value={contentOne} className={"flex-1 purple-input p-1"} placeholder={"Button Content"} />
                        </div>
                        <div className={"flex flex-row mt-2"}>
                          <select onChange={handleSwitchButtonOne} value={buttonTypeOne} className={"purple-input flex-1 p-1"}>
                            <option value={"redirect"}>Redirect User</option>
                            <option value={"email"}>Send Email</option>
                            <option value={"api"}>API Call</option>
                          </select>
                        </div>
                        {
                          buttonTypeOne === "redirect" && (
                            <>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>Redirect URL</p>
                              </div>
                              <div className={"flex flex-row"}>
                                <input onChange={e => setUrlOne(e.target.value)} value={urlOne} className={"flex-1 purple-input p-1"} placeholder={"Redirect URL"} />
                              </div>
                            </>
                          )
                        }
                        {
                          buttonTypeOne === "email" && (
                            <>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>Email</p>
                              </div>
                              <div className={"flex flex-row"}>
                                <input onChange={e => setEmailOne(e.target.value)} value={emailOne} className={"flex-1 purple-input p-1"} placeholder={"Email Address"} />
                              </div>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>Subject</p>
                              </div>
                              <div className={"flex flex-row"}>
                                <input onChange={e => setSubjectOne(e.target.value)} value={subjectOne} className={"flex-1 purple-input p-1"} placeholder={"Subject Of Email"} />
                              </div>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>Email Body</p>
                              </div>
                              <div className={"flex flex-row"}>
                                <input onChange={e => setSubjectOne(e.target.value)} value={subjectOne} className={"flex-1 purple-input p-1"} placeholder={"Body Of Email"} />
                              </div>
                            </>
                          )
                        }
                        {
                          buttonTypeOne === "api" && (
                            <>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>API Endpoint</p>
                              </div>
                              <div className={"flex flex-row"}>
                                <input onChange={e => setUrlOne(e.target.value)} value={urlOne} className={"flex-1 purple-input p-1"} placeholder={"API Endpoint"} />
                              </div>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>Subject</p>
                              </div>
                              <div className={"mt-2 flex flex-row"}>
                                <div className={"flex-1 flex flex-col ml-1"}>
                                  <p className={"card-title text-sm"}>Key</p>
                                  <input onChange={e => setKeyOne(e.target.value)} value={keyOne} className={"w-full purple-input"} placeholder={"Key"} />
                                </div>
                                <div className={"flex-1 flex flex-col mr-1"}>
                                  <p className={"card-title text-sm"}>Value</p>
                                  <input onChange={e => setValueOne(e.target.value)} value={valueOne} className={"w-full purple-input p-1"} placeholder={"Value"} />
                                </div>
                                <div className={"flex"}>
                                  <button onClick={handleAddValueOne} className={"option-color p-1"}>ADD</button>
                                </div>
                              </div>
                              <div className={"mt-2 flex flex-row"}>
                                <div className={"flex flex-col flex-1 mr-1"}>
                                  <p className={"text-sm card-title"}>KEYS</p>
                                </div>
                                <div className={"flex flex-col flex-1 ml-1"}>
                                  <p className={"text-sm card-title"}>VALUES</p>
                                </div>
                              </div>
                              {
                                allVariablesOne && allVariablesOne.map(variable => {
                                  return (
                                    <div className={"flex flex-row"}>
                                      <div className={"flex flex-col flex-1 mr-1"}>
                                        <p className={"nav-text"}>
                                          {variable[0]}
                                        </p>
                                      </div>
                                      <div className={"flex flex-col flex-1 ml-1"}>
                                        <p className={"nav-text"}>
                                          {variable[1]}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                            </>
                          )
                        }
                      </>
                    )
                  }
                  {
                    currside === 2 && typeTwo === "button" && (
                      <>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Button</p>
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Text Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setColorTwo(e.target.value)} value={colorTwo} className={"flex-1 purple-input p-1"} placeholder={"Color"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Background Color</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input type={"color"} onChange={e => setBackgroundTwo(e.target.value)} value={backgroundTwo} className={"flex-1 purple-input p-1"} placeholder={"Background Color"} />
                        </div>
                        <div className={"mt-2 flex flex-row"}>
                          <p className={"card-title text-sm"}>Button Text</p>
                        </div>
                        <div className={"flex flex-row"}>
                          <input onChange={e => setContentTwo(e.target.value)} value={contentTwo} className={"flex-1 purple-input p-1"} placeholder={"Button Content"} />
                        </div>
                        <div className={"flex flex-row mt-2"}>
                          <select onChange={handleSwitchButtonTwo} value={buttonTypeTwo} className={"purple-input flex-1 p-1"}>
                            <option value={"redirect"}>Redirect User</option>
                            <option value={"email"}>Send Email</option>
                            <option value={"api"}>API Call</option>
                          </select>
                        </div>
                        {
                          buttonTypeTwo === "redirect" && (
                            <>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>Redirect URL</p>
                              </div>
                              <div className={"flex flex-row"}>
                                <input onChange={e => setUrlTwo(e.target.value)} value={urlTwo} className={"flex-1 purple-input p-1"} placeholder={"Redirect URL"} />
                              </div>
                            </>
                          )
                        }
                        {
                          buttonTypeTwo === "email" && (
                            <>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>Email</p>
                              </div>
                              <div className={"flex flex-row"}>
                                <input onChange={e => setEmailTwo(e.target.value)} value={emailTwo} className={"flex-1 purple-input p-1"} placeholder={"Email Address"} />
                              </div>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>Subject</p>
                              </div>
                              <div className={"flex flex-row"}>
                                <input onChange={e => setSubjectTwo(e.target.value)} value={subjectTwo} className={"flex-1 purple-input p-1"} placeholder={"Subject Of Email"} />
                              </div>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>Email Body</p>
                              </div>
                              <div className={"flex flex-row"}>
                                <input onChange={e => setSubjectTwo(e.target.value)} value={subjectTwo} className={"flex-1 purple-input p-1"} placeholder={"Body Of Email"} />
                              </div>
                            </>
                          )
                        }
                        {
                          buttonTypeTwo === "api" && (
                            <>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>API Endpoint</p>
                              </div>
                              <div className={"flex flex-row"}>
                                <input onChange={e => setUrlTwo(e.target.value)} value={urlTwo} className={"flex-1 purple-input p-1"} placeholder={"API Endpoint"} />
                              </div>
                              <div className={"mt-2 flex flex-row"}>
                                <p className={"card-title text-sm"}>Subject</p>
                              </div>
                              <div className={"mt-2 flex flex-row"}>
                                <div className={"flex-1 flex flex-col ml-1"}>
                                  <p className={"card-title text-sm"}>Key</p>
                                  <input onChange={e => setKeyTwo(e.target.value)} value={keyTwo} className={"w-full purple-input"} placeholder={"Key"} />
                                </div>
                                <div className={"flex-1 flex flex-col mr-1"}>
                                  <p className={"card-title text-sm"}>Value</p>
                                  <input onChange={e => setValueTwo(e.target.value)} value={valueTwo} className={"w-full purple-input p-1"} placeholder={"Value"} />
                                </div>
                                <div className={"flex"}>
                                  <button onClick={handleAddValueTwo} className={"option-color p-1"}>ADD</button>
                                </div>
                              </div>
                              <div className={"mt-2 flex flex-row"}>
                                <div className={"flex flex-col flex-1 mr-1"}>
                                  <p className={"text-sm card-title"}>KEYS</p>
                                </div>
                                <div className={"flex flex-col flex-1 ml-1"}>
                                  <p className={"text-sm card-title"}>VALUES</p>
                                </div>
                              </div>
                              {
                                allVariablesTwo && allVariablesTwo.map(variable => {
                                  return (
                                    <div className={"flex flex-row"}>
                                      <div className={"flex flex-col flex-1 mr-1"}>
                                        <p className={"nav-text"}>
                                          {variable[0]}
                                        </p>
                                      </div>
                                      <div className={"flex flex-col flex-1 ml-1"}>
                                        <p className={"nav-text"}>
                                          {variable[1]}
                                        </p>
                                      </div>
                                    </div>
                                  )
                                })
                              }
                            </>
                          )
                        }
                      </>
                    )
                  }
                  <div className={"flex flex-1 flex-row justify-end mt-2"}>
                    <button onClick={handleAddWidget} className={"p-1 option-color text-white"}>ADD</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}