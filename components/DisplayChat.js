import {useState, useEffect} from "react";

export default function DisplayChat(props) {
  const [removingChat, setRemovingChat] = useState([])
  const responseExsists = () => {
    var counter = 0
    props.prechats && props.prechats.forEach(response => {
      if (response.parent === props.currAnswer && response.type == "response") {
        counter++
      }
    })
    return counter > 0
  }

  const handleSwitchAnswer = (id) => {
    props.setCurrAnswer(id)
  }

  useEffect(() => {
    setRemovingChat([])
  }, [props.currAnswer])

  return (
      <div className={"w-full flex flex-col justify-between curved-all card-background outer-shadow"}>
        <div className={"flex flex-col p-5"}>
          <div className={"grid grid-cols-12"}>
            <div className={"col-span-1 p-2"}>
              <div className={"w-full h-hull bg-white aspect-square circle response-color"}></div>
            </div>
            <div className={"col-span-10 my-auto purple-border-bottom"}>
              <p className={"text-sm text-black card-title text-bold"}>Adding Response</p>
            </div>
          </div>
          {
            responseExsists() && props.prechats && props.prechats.map(chat => {
              if (chat && chat.parent && chat.parent === props.currAnswer && chat.type == "response") {
                return (
                  <>
                    <button onClick={() => {
                      setRemovingChat([...removingChat, chat.id])
                    }}
                    className={"grid grid-cols-12 "}>
                      <div className={"col-span-1 flex justify-center"}>
                        <div className={"h-full bg-white purple-border"}></div>
                      </div>
                      <div className={"col-span-10 curved-all pt-2 pb-2"}>
                        <div className={"light-primary-background curved-all flex flex-row"}>
                          <div className={"flex curved-right p-2 dark-secondary-background"}></div>
                          <div className={"flex flex-1 p-2"}>
                            <p className={" text-white inner-text"}>{chat.content}</p>
                          </div>
                        </div>
                      </div>
                    </button>
                    {
                      removingChat.includes(chat.id) && (
                        <div className={"grid grid-cols-12"}>
                          <div className={"col-span-1"}></div>
                          <div className={"col-span-10"}>
                            <button onClick={() => {
                              var found = false
                              var index
                              removingChat.forEach((chatIndex, chatId) => {
                                if (chatId == chat.id) {
                                  found = true
                                  index = chatIndex
                                }
                              })
                              const newRemovingChats = removingChat
                              newRemovingChats.splice(index, 1)
                              props.handleRemoveChat(chat.id)
                            }} className={"option-color p-1 mr-1"}>remove item</button>
                            <button className={"option-color p-1 ml-1"}>cancel</button>
                          </div>
                        </div>
                      )
                    }
                  </>
                )
              }
            })
          }
          {
            responseExsists() && (
              <div className={"grid grid-cols-12"}>
                <div className={"col-span-1 p-2"}>
                  <div className={"w-full h-hull aspect-square circle option-color"}></div>
                </div>
                <div className={"col-span-10 my-auto purple-border-bottom"}>
                  <p className={"card-title"}>Adding Options</p>
                </div>
              </div>
            )
          }
          {
            responseExsists() && props.prechats && props.prechats.map(answer => {
              if (answer.parent && answer.parent === props.currAnswer && answer.type === "answer") {
                return (
                  <div className={"grid grid-cols-12 "}>
                    <div className={"col-span-1 flex justify-center"}>
                      <div className={"h-full bg-white purple-border"}></div>
                    </div>
                    <button onClick={() => {
                      props.setCurrAnswer(answer.id)
                    }} className={"col-span-10 curved-all pt-2 pb-2"}>
                      <div className={"light-primary-background curved-all flex flex-row"}>
                        <div className={"flex curved-right p-2 dark-secondary-background"}></div>
                        <div className={"flex flex-1 p-2"}>
                          <p className={" text-white inner-text"}>{answer.content}</p>
                        </div>
                      </div>
                    </button>
                  </div>
                )
              }
            })
          }
        </div>
        <div className={"dark-secondary-background w-full p-2 curved-bottom-corners"}></div>
      </div>
  )
}