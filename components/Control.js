import {useState} from "react";

export default function Control(props) {
    const [newResponse, setNewResponse] = useState("")
    const [newAnswer, setNewAnswer] = useState("")
    const [addingResponse, setAddingResponse] = useState(false)
    const [addingAnswer, setAddingAnswer] = useState(false)

    const handleAddResponse = () => {
      const newResponseInstance = {type: "response", parent: props.currAnswer, content: newResponse, id: props.highestId + 1}
      props.setHighestId(props.highestId + 1)
      props.setPrechats([...props.prechats, newResponseInstance])
      props.setStateCounter(props.stateCounter + 1)
      setNewResponse("")
      setAddingResponse(false)
      props.handleAddPrompt(newResponseInstance)
    }

    const handleAddAnswer = () => {
      const newResponseInstance = {type: "answer", parent: props.currAnswer, content: newAnswer, id: props.highestId + 1}
      props.setHighestId(props.highestId + 1)
      props.setPrechats([...props.prechats, newResponseInstance])
      props.setStateCounter(props.stateCounter + 1)
      setNewAnswer("")
      setAddingAnswer(false)
      props.handleAddPrompt(newResponseInstance)
    }

    const handleRemoveAnswer = () => {
      props.handleRemoveChat(props.currAnswer)
      setNewAnswer("")
      setAddingAnswer(false)
    }

    const checkPreChats = () => {
      var counter = 0;
      props.prechats.forEach(chat => {
        if (chat.parent && chat.type === "response" && chat.parent === props.currAnswer) {
          counter++;
        }
      })
      return counter > 0
    }

    const checkInitialization = () => {
      var final = false
      props.prechats.forEach(chat => {
        if (chat.id === props.currAnswer && chat.first) {
          final = true
        }
      })
      return final
    }

    const getCurrentPrompt = () => {
      var prompt = ""
      props.prechats.forEach(chat => {
        if (chat.id === props.currAnswer) {
          prompt = chat.content
        }
      })

      return prompt
    }

    return (
      <div className={"w-full flex flex-col justify-between secondary-background curved-all card-background outer-shadow"}>
        <div className={"w-full flex flex-col p-5"}>
          {
            !checkInitialization() && (
              <>
              <p className={"card-title text-sm purple-border-bottom p-2"}>Responses</p>
              </>
            )
          }
          {
            checkInitialization() && (
              <p className={"card-title text-sm purple-border-bottom"}>Responses to Initialization</p>
            )
          }
          {
            !checkInitialization() && (
              <div className={"light-primary-background curved-all flex flex-row mt-4 mb-4"}>
                <div className={"flex curved-right p-2 dark-secondary-background"}></div>
                <div className={"flex flex-1 p-2"}>
                  <p className={" text-white inner-text"}>{getCurrentPrompt()}</p>
                </div>
              </div>
            )
          }
          {
            checkInitialization() && (
              <div className={"light-primary-background curved-all flex flex-row mt-4 mb-4"}>
                <div className={"flex curved-right p-2 dark-secondary-background"}></div>
                <div className={"flex flex-1 p-2"}>
                  <p className={" text-white inner-text"}>This is an initialized prompt</p>
                </div>
              </div>
            )
          }
          <div className={"flex flex-row"}>
            {
              !checkInitialization() && (
                <div className={"flex"}>
                  <button onClick={props.handleBack} className={"option-color p-2 w-full text-white text-2xl mt-2 mr-1 curved-all-semi"}>
                    ^
                  </button>
                </div>
              )
            }
            {
              checkPreChats() && !addingAnswer && (
                <div className={"flex flex-1"}>
                  <button
                    onClick={() => {
                      setAddingAnswer(true)
                    }}
                    className={"option-color p-2 w-full text-white text-2xl mt-2 ml-1 mr-1 curved-all-semi"}>
                    Add Answer
                  </button>
                </div>
              )
            }
            {
              props.currAnswer !== 1 && (
                <div className={"flex flex-1"}>
                  <button
                    onClick={() => {
                      handleRemoveAnswer()
                    }}
                    className={"option-color p-2 w-full text-white text-2xl mt-2 ml-1 mr-1 curved-all-semi"}>
                    Remove Answer
                  </button>
                </div>
              )
            }
            {
              !addingResponse && (
                <div className={"flex flex-1"}>
                  <button onClick={() => {
                    setAddingResponse(true)
                  }}
                          className={"option-color p-2 w-full text-white text-2xl mt-2 ml-1 mr-1 curved-all-semi"}>
                    Add Response
                  </button>
                </div>
              )
            }
          </div>

          {
            addingResponse && (
              <div className={"flex flex-col"}>
                <div className={"flex flex-row"}>
                  <p className={"card-title text-sm  p-2 flex flex-1"}>New Response:</p>
                </div>
                <div className={"flex flex-row"}>
                  <div className={"flex-1"}>
                    <input onChange={e => setNewResponse(e.target.value)} value={newResponse} className={"border w-full my-auto h-full purple-input"} placeholder={"Enter Response"} />
                  </div>
                  <div className={"flex"}>
                    <button onClick={handleAddResponse} className={"option-color p-1 w-full text-white ml-1 mr-1 curved-all-semi"}>
                      ✓
                    </button>
                  </div>
                  <div className={"flex"}>
                    <button onClick={() => {
                      setAddingResponse(false)
                    }} className={"option-color p-2 w-full text-white mr-1 curved-all-semi"}>
                      X
                    </button>
                  </div>
                </div>
              </div>
            )
          }
          {
            checkPreChats() && addingAnswer && (
              <div className={"flex flex-col"}>
                <div className={"flex flex-row"}>
                  <p className={"card-title text-sm  p-2 flex flex-1"}>New Answer:</p>
                </div>
                <div className={"flex flex-row"}>
                  <div className={"flex-1"}>
                    <input onChange={e => setNewAnswer(e.target.value)} value={newAnswer} className={"border w-full my-auto h-full purple-input"} placeholder={"Enter Answer"} />
                  </div>
                  <div className={"flex"}>
                    <button onClick={handleAddAnswer} className={"option-color p-1 w-full text-white ml-1 mr-1 curved-all-semi"}>
                      ✓
                    </button>
                  </div>
                  <div className={"flex"}>
                    <button onClick={() => {
                      setAddingAnswer(false)
                    }} className={"option-color p-2 w-full text-white mr-1 curved-all-semi"}>
                      X
                    </button>
                  </div>
                </div>
              </div>
            )
          }
        </div>
        <div className={"dark-secondary-background w-full p-2 curved-bottom-corners"}>
        </div>
      </div>
    )
}