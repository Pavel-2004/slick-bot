import {useState} from "react";

export default function DisplayChatCurr(props) {
  const [currentChat, setCurrentChat] = useState("")

  const getChats = () => {
    var currChat
    props.chats.forEach(chat => {
      if (chat.chatId === props.currentChatId) {
        currChat = chat
      }
    })
    return currChat
  }

  return (
    <div className={"w-full flex flex-col justify-between secondary-background curved-all card-background outer-shadow max-h-full"}>
      <div className={"w-full flex flex-1 flex-col p-2"} style={{overflowY: "auto"}}>
        <p className={"card-title text-sm purple-border-bottom p-2"}>general</p>
        <div className={"mt-2 flex flex-col h-full"} style={{overflowY: "scroll"}}>
          {
            props.currentChatId && getChats().chats.map(chat => {
              if (chat.from === "admin") {
                return (
                  <div className={"flex flex-row mt-2"}>
                    <div className={"flex p-3 aspect-square circle  my-auto bg-white"}></div>
                    <div className={"flex flex-1 curved-left ml-1 p-1"} style={{backgroundColor: "#5B6B9E"}}>
                      <p className={"text-white text-sm"} style={{fontWeight: "bolder"}}>{chat.content}</p>
                    </div>
                  </div>
                )
              }
              else {
                return (
                  <div className={"flex flex-row mt-2"}>
                    <div className={"flex p-3 aspect-square circle my-auto"}></div>
                    <div className={"flex flex-1 curved-all-semi ml-1 p-1"} style={{backgroundColor: "#9AA4CF"}}>
                      <p className={"text-white text-sm"} style={{fontWeight: "bolder"}}>{chat.content}</p>
                    </div>
                  </div>
                )
              }
            })
          }
        </div>
      </div>
      <div className={"flex flex-col"}>
        <div className={"flex flex-row"}>
          <div className={"flex-1 flex"}>
            <input onChange={e => setCurrentChat(e.target.value)} value={currentChat} placeholder={"Type your message here.."} className={"w-full chat-input text-sm"} style={{color: "#5B6B9E", fontWeight: "bolder", borderBottomColor: "#5B6B9E"}} />
          </div>
          <div className={"flex"}>
            <button>
              <img src={"/thumbnails.svg"}/>
            </button>
          </div>
          <div className={"flex"}>
            <button onClick={() => {
              props.sendChat(props.currentChatId, currentChat)
              setCurrentChat("")
            }}>
              <svg width="20px" height="20px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 14L12.2728 19.3032C12.5856 20.0331 13.5586 20.1103 13.9486 19.4185C14.7183 18.0535 15.8591 15.8522 17 13C19 8 20 4 20 4M10 14L4.69678 11.7272C3.96687 11.4144 3.88975 10.4414 4.58149 10.0514C5.94647 9.28173 8.14784 8.14086 11 7C16 5 20 4 20 4M10 14L20 4" stroke={"#5B6B9E"} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
        <div className={"dark-secondary-background w-full p-2 curved-bottom-corners mt-2"}></div>
      </div>
    </div>
  )
}