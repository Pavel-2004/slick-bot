export default function TicketDisplay(props) {
  return (
    <div className={"w-full flex flex-col justify-between secondary-background curved-all card-background outer-shadow"}>
      <div className={"w-full flex flex-col p-5"}>
        <p className={"card-title text-sm purple-border-bottom p-2"}>Chat Ticket Manager</p>
        {
          props.tickets && props.tickets.map(ticket => {
            console.log(ticket)
            if (ticket.status === "pending") {
              return (
                <div className={"flex flex-row light-primary-background mt-4 curved-all"}>
                  <div className={"flex pt-8 pb-8 pl-4 pr-2"} style={{backgroundColor: "#E0E415"}}></div>
                  <div className={"flex flex-1 flex-row p-2"}>
                    <div className={"flex flex-1 flex-col justify-between"}>
                      <div className={"flex flex-col"}>
                        <p className={"nav-text text-xl"}>{ticket.name}</p>
                        <p style={{fontWeight: "bolder"}} className={"secondary-text text-sm"}>{ticket.company}</p>
                      </div>
                      <div className={"flex flex-row mt-4"}>
                        <button onClick={() => props.handleAcceptChat(ticket.chatId)} className={"card-title text-sm mr-2"}>begin chat</button>
                        <button onClick={() => props.handleRejectChat(ticket.chatId)} className={"card-title text-sm ml-2"}>Get back later</button>
                      </div>
                    </div>
                    <div className={"flex"}></div>
                  </div>
                </div>
              )
            }

            if (ticket.status === "accepted" && ticket.adminId && ticket.adminId === props.userId) {
              return (
                <div className={"flex flex-row light-primary-background mt-4 curved-all"}>
                  <div className={"flex pt-8 pb-8 pl-4 pr-2"} style={{backgroundColor: "#89E415"}}></div>
                  <div className={"flex flex-1 flex-row p-2"}>
                    <div className={"flex flex-1 flex-col justify-between"}>
                      <div className={"flex flex-col"}>
                        <p className={"nav-text text-xl"}>{ticket.name}</p>
                        <p style={{fontWeight: "bolder"}} className={"secondary-text text-sm"}>{ticket.company}</p>
                      </div>
                      <div className={"flex flex-row mt-4"}>
                        <button className={"card-title text-sm mr-2"}>Continue Chat</button>
                      </div>
                    </div>
                    <div className={"flex"}>
                      <div className={"aspect-square p-10 my-auto card-background circle"}></div>
                    </div>
                  </div>
                </div>
              )
            }

            if (ticket.status === "accepted" && ticket.adminId && ticket.adminId !== props.userId) {
              return (
                <div className={"flex flex-row light-primary-background mt-4 curved-all"}>
                  <div className={"flex pt-8 pb-8 pl-4 pr-2"} style={{backgroundColor: "#89E415"}}></div>
                  <div className={"flex flex-1 flex-row p-2"}>
                    <div className={"flex flex-1 flex-col justify-between"}>
                      <div className={"flex flex-col"}>
                        <p className={"nav-text text-xl"}>{ticket.name}</p>
                        <p style={{fontWeight: "bolder"}} className={"secondary-text text-sm"}>{ticket.company}</p>
                        <p style={{fontWeight: "bolder"}} className={"secondary-text text-sm"}>Chatting with {ticket.adminName}</p>
                      </div>
                      <div className={"flex flex-row mt-4"}>
                        <button className={"card-title text-sm mr-2"}>View Chat</button>
                      </div>
                    </div>
                    <div className={"flex"}>
                      <div className={"aspect-square p-10 my-auto card-background circle"}></div>
                    </div>
                  </div>
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