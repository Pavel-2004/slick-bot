export default function ChatDisplay(props) {
  return (
    <div className={"w-full flex flex-col justify-between curved-all card-background outer-shadow"}>
      <div className={"w-full flex flex-1 flex-col pt-5 pb-5 pl-24 pr-24"}>
        <div className={"flex flex-col h-full"} style={{backgroundColor: props.chatSettings.background}}>
          <div onClick={() => {
            props.setEditor(1)
          }
          } className={"flex flex-row p-2 border-2 curved-top-corners"} style={{backgroundColor: props.chatSettings.nav.background}}>
            <div className={"flex p-5 aspect-square circle light-primary-background my-auto"}></div>
            <div className={"flex-1 ml-4 "}>
              <p className={"text-xl"} style={{color: props.chatSettings.nav.title, fontWeight: "bolder"}}>Company Name</p>
              <p className={"text-sm"} style={{fontWeight:"bolder", color: props.chatSettings.nav.subtitle}}>This is more info for the user</p>
            </div>
          </div>
          <div className={"flex flex-col flex-1 border-2"}>
            <div className={"flex flex-row mt-2 pl-2 pr-4"} onClick={() => {
              props.setEditor(2)
            }}>
              <div className={"flex p-5 aspect-square circle card-background my-auto border-2"}></div>
              <div className={"flex-1 ml-4 curved-left p-2"} style={{backgroundColor: props.chatSettings.botTexting.background, border: "solid", borderColor: props.chatSettings.botTexting.border}}>
                <p className={"text-sm"} style={{fontWeight: "bolder", color: props.chatSettings.botTexting.text}}>This is where the text from the user goes</p>
              </div>
            </div>
            <div className={"flex flex-row mt-4 pl-2 pr-4"} onClick={() => {
              props.setEditor(3)
            }}>
              <div className={"flex p-5 aspect-square circle my-auto"}></div>
              <div className={"flex-1 ml-4 curved-all p-2"} style={{backgroundColor: props.chatSettings.userTexting.background, border: "solid", borderColor: props.chatSettings.userTexting.border}}>
                <p className={"text-sm"} style={{fontWeight: "bolder", color: props.chatSettings.userTexting.text}}>This is where the text from the user goes</p>
              </div>
            </div>
            <div className={"flex flex-row justify-end mt-4 pl-2 pr-4"} onClick={() => {
              props.setEditor(4)
            }
            }>
              <div className={"curved-all p-1 mr-1"} style={{backgroundColor: props.chatSettings.userbutton.background, border: "solid", borderColor: props.chatSettings.userbutton.border}}>
                <p className={"text-sm"} style={{color: props.chatSettings.userbutton.text, fontWeight: "bolder"}}>Option 1</p>
              </div>
              <div className={"curved-all p-1 ml-1 mr-1"} style={{backgroundColor: props.chatSettings.userbutton.background, border: "solid", borderColor: props.chatSettings.userbutton.border}}>
                <p className={"text-sm"} style={{color: props.chatSettings.userbutton.text, fontWeight: "bolder"}}>Option 2</p>
              </div>
              <div className={"curved-all p-1 ml-1"} style={{backgroundColor: props.chatSettings.userbutton.background, border: "solid", borderColor: props.chatSettings.userbutton.border}}>
                <p className={"text-sm"} style={{color: props.chatSettings.userbutton.text, fontWeight: "bolder"}}>Option 3</p>
              </div>
            </div>
          </div>
          <div className={"flex flex-row p-2 border-2"} onClick={() => {
            props.setEditor(5)
          }}>
            <div className={"flex-1 flex"}>
              <input value={"Hello, how are you doing today?"} onChange={() => {}} placeholder={"Type your message here.."} className={"w-full chat-input"} style={{color: props.chatSettings.inputSend.text, fontWeight: "bolder", borderBottomColor: props.chatSettings.inputSend.text}} />
            </div>
            <div className={"flex"}>
              <button>
                <svg width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 14L12.2728 19.3032C12.5856 20.0331 13.5586 20.1103 13.9486 19.4185C14.7183 18.0535 15.8591 15.8522 17 13C19 8 20 4 20 4M10 14L4.69678 11.7272C3.96687 11.4144 3.88975 10.4414 4.58149 10.0514C5.94647 9.28173 8.14784 8.14086 11 7C16 5 20 4 20 4M10 14L20 4" stroke={props.chatSettings.inputSend.button} stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className={"dark-secondary-background w-full p-2 curved-bottom-corners"}>
      </div>
    </div>
  )
}