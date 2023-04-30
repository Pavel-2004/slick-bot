export default function DisplayActiveChat(props) {
  return (
    <div className={"w-full flex flex-col justify-between secondary-background curved-all card-background outer-shadow h-full"}>
      <div className={"w-full flex flex-1 flex-col p-2 border-2"} style={{overflowY: "auto"}}>
        <p className={"card-title text-sm purple-border-bottom p-2"}>Current Chats</p>
        <div className={"mt-2 flex flex-col h-full"} style={{overflowY: "scroll"}}>
          {
            props.chats.map(chat => {
              if (chat.adminId && chat.adminId === props.currentUserId) {
                if (chat.chatId === props.currentChatId) {
                  return (
                    <button
                      onClick={() => {
                        props.setCurrentChatId(chat.chatId)
                      }}
                      className={"flex flex-row"}>
                      <div className={"flex flex-row w-full"}>
                        <div className={"flex pt-4 pb-4 pr-1 pl-1 option-color"}></div>
                        <div className={"flex flex-1 flex-col p-2 bg-nav"}>
                          <p className={"nav-text"}>{chat.name}</p>
                          <p className={"secondary-text"}>{chat.issue}</p>
                        </div>
                      </div>
                    </button>
                  )
                }
                else {
                  return (
                    <button
                      onClick={() => {
                        props.setCurrentChatId(chat.chatId)
                      }}
                      className={"flex flex-row"}>
                      <div className={"flex flex-row w-full"}>
                        <div className={"flex pt-4 pb-4 pr-1 pl-1 option-color"}></div>
                        <div className={"flex flex-1 flex-col p-2"}>
                          <p className={"nav-text"}>{chat.name}</p>
                          <p className={"secondary-text"}>{chat.issue}</p>
                        </div>
                      </div>
                    </button>
                  )
                }
              }
            })
          }

        </div>
      </div>
      <div className={"dark-secondary-background w-full p-2 curved-bottom-corners"}>
      </div>
    </div>
  )
}