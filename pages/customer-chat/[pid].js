import {useEffect, useState} from "react";
import  {useRouter} from "next/router";
import {useCustomerChat} from "../../hooks/customer-chat";

export default function Chat() {
  const [display, setDisplay] = useState(false)
  const router = useRouter()
  const { pid } = router.query
  const [chat, setChat, chats, options, chatSetting, handleNewOptions, handleStartSpeakAdmin, handleSend] = useCustomerChat(pid)

  console.log(chatSetting)

  if (!display) {
    return (
      <div className={"border-2"}>
        {
          <button onClick={() => {
            setDisplay(true)
            var data = {opened: true}
            window.parent.postMessage(data, "*")
          }}>
            <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M10 14L12.2728 19.3032C12.5856 20.0331 13.5586 20.1103 13.9486 19.4185C14.7183 18.0535 15.8591 15.8522 17 13C19 8 20 4 20 4M10 14L4.69678 11.7272C3.96687 11.4144 3.88975 10.4414 4.58149 10.0514C5.94647 9.28173 8.14784 8.14086 11 7C16 5 20 4 20 4M10 14L20 4" stroke={chatSetting.inputSend.button} />
            </svg>
          </button>
        }
      </div>
    )
  }
  else {
    return (
      <div className={"flex flex-col min-h-screen"} style={{backgroundColor: chatSetting.background, borderTopLeftRadius: "40px", borderTopRightRadius: "40px"}}>
        <div className={"flex flex-row justify-between p-2"} style={{backgroundColor: chatSetting.nav.background, borderTopLeftRadius: "20px", borderTopRightRadius: "20px"}}>
          <div className={"flex flex-row"}>
            <div className={"flex p-5 aspect-square circle light-primary-background my-auto"}></div>
            <div className={"flex flex-col flex-1 ml-4"}>
              <p className={"text-xl"} style={{color: chatSetting.nav.title, fontWeight: "bolder"}}>Company Name</p>
              <p className={"text-sm"} style={{fontWeight:"bolder", color: chatSetting.nav.subtitle}}>This is more info for the user</p>
            </div>
          </div>
          <div className={"flex"}>
            <button onClick={() => {
              setDisplay(false)
              var data = {opened: false}
              window.parent.postMessage(data, "*")
            }} className={"text-4xl"} style={{color: chatSetting.nav.title}}>-</button>
          </div>
        </div>
        <div className={"flex-1"}>
          {
            chats.map(chat => {
              if (chat.from === "admin") {
                return (
                  <div className={"flex flex-row mt-2 pl-2 pr-4"}>
                    <div className={"flex p-5 aspect-square circle card-background my-auto border-2"}></div>
                    <div className={"flex ml-1 curved-left p-2"} style={{backgroundColor: chatSetting.botTexting.background, border: "solid", borderColor: chatSetting.botTexting.border}}>
                      <p className={"text-sm"} style={{fontWeight: "bolder", color: chatSetting.botTexting.text}}>{chat.content}</p>
                    </div>
                  </div>
                )
              }
              else {
                return (
                  <div className={"flex flex-row justify-end mt-2 pl-2 pr-4"}>
                    <div className={"flex p-5 aspect-square circle my-auto"}></div>
                    <div className={"flex ml-4 curved-all p-2"} style={{backgroundColor: chatSetting.userTexting.background, border: "solid", borderColor: chatSetting.userTexting.border}}>
                      <p className={"text-sm"} style={{fontWeight: "bolder", color: chatSetting.userTexting.text}}>{chat.content}</p>
                    </div>
                  </div>
                )
              }
            })
          }
          {
            options.map(option => {
              if (option.admin) {
                return (
                  <div className={"flex flex-row justify-end mt-2"}>
                    <button
                      onClick={handleStartSpeakAdmin}
                      className={"curved-all p-1 mr-4"} style={{backgroundColor: chatSetting.userbutton.background, border: "solid", borderColor: chatSetting.userbutton.border}}>
                      {option.content}
                    </button>
                  </div>
                )
              }
              else {
                return (
                  <div className={"flex flex-row justify-end mt-2"}>
                    <button
                      onClick={() => {
                        handleNewOptions(option.id)
                      }}
                      className={"curved-all p-1 mr-4"} style={{backgroundColor: chatSetting.userbutton.background, border: "solid", borderColor: chatSetting.userbutton.border}}>
                      {option.content}
                    </button>
                  </div>
                )
              }
            })
          }
        </div>
        <div className={"flex flex-row p-2 border-2"}>
          <div className={"flex-1 flex"}>
            <input onChange={e => setChat(e.target.value)} value={chat} placeholder={"Type your message here.."} className={"w-full chat-input"} style={{color: chatSetting.inputSend.text, fontWeight: "bolder", borderBottomColor: chatSetting.inputSend.text}} />
          </div>
          <div className={"flex"}>
            <button onClick={handleSend}>
              <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10 14L12.2728 19.3032C12.5856 20.0331 13.5586 20.1103 13.9486 19.4185C14.7183 18.0535 15.8591 15.8522 17 13C19 8 20 4 20 4M10 14L4.69678 11.7272C3.96687 11.4144 3.88975 10.4414 4.58149 10.0514C5.94647 9.28173 8.14784 8.14086 11 7C16 5 20 4 20 4M10 14L20 4" stroke={chatSetting.inputSend.button} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
            </button>
          </div>
        </div>
      </div>
    )
  }
}