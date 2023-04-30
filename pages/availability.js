import {useState} from "react";

export default function chatTicket() {
  const [name, setName] = useState("Pavel")
  const [accountState, setAccountState] = useState(1)
  const [team, setTeam] = useState(15)

  return (
    <div className={"min-h-screen w-full flex flex-col primary-background"}>
      <div className={"flex flex-col"}>
        <div className={"w-full bg-nav flex flex-row justify-between curved-bottom-corners"}>
          <p className={"text-white text-3xl ml-5 nav-text"}>SlickBot</p>
          <div className={"flex flex-row h-full my-auto h-full"}>
            <button className={"option-color p-1 text-white h-full text-2xl ml-2 mr-2"}>Pre Chat</button>
            <button className={"nav-text p-1 text-white h-full text-2xl ml-2 mr-2"}>Availability</button>
            <button className={"nav-text p-1 text-white h-full text-2xl ml-2 mr-2"}>Chat</button>
          </div>
          <div className={"flex flex-row h-full my-auto h-full"}>
            <p className={"text-white text-2xl mr-2 nav-text"}>Work Place</p>
            <div className={"bg-white h-full aspect-square p-4 my-auto mr-2 circle"}></div>
          </div>
        </div>
      </div>
      <div className={"flex flex-1 flex-row mt-10 mb-10 pl-10 pr-10"}>
        <div className={"flex flex-1"}>
          <div className={"w-full flex flex-col justify-between secondary-background curved-all card-background outer-shadow"}>
            <div className={"w-full flex flex-col p-5"}>
              <p className={"card-title text-sm purple-border-bottom p-2"}>Availability</p>
              <p className={"nav-text text-3xl mt-2"}>Welcome, {name}</p>
              {
                accountState === 1 && (
                  <p className={"secondary-text text-xl"}>You are currently active on desktop. Monitor the the tickets page to see if you have any new chats and keep a slack channel open</p>
                )
              }
              {
                accountState === 2 && (
                  <p className={"secondary-text text-xl"}>You are currently active on mobile. You will get notification every time that there are new tickets available.</p>
                )
              }
              {
                accountState === 3 && team > 0 && (
                  <p className={"secondary-text text-xl"}>You are currently offline on both mobile and desktop. However, there are other active agents at the moment able to assist. </p>
                )
              }
              <p className={"card-title text-sm mt-2"}>ACTIVE USERS</p>
              <p className={"secondary-text text-xl"}>Your team currently has {team} active agents available to assist leads.</p>
              <div className={"flex flex-col"}>
                {
                  accountState === 1 && (
                    <>
                      <div className={"flex flex-row"}>
                        <p className={"card-title text-sm mt-2"}>ENABLE PHONE NOTIFICATIONS</p>
                      </div>
                      <div className={"flex flex-row"}>
                        <button className={"mt-2 option-color p-2 text-white flex text-sm curved-all-semi"}>ENABLE</button>
                      </div>
                    </>
                  )
                }
                {
                  accountState === 2 && (
                    <>
                      <div className={"flex flex-row"}>
                        <p className={"card-title text-sm mt-2"}>DISABLE PHONE NOTIFICATIONS</p>
                      </div>
                      <div className={"flex flex-row"}>
                        <button className={"mt-2 option-color p-2 text-white flex text-sm curved-all-semi"}>DISABLE</button>
                      </div>
                    </>
                  )
                }
                {
                  accountState === 3 && (
                    <>
                      <div className={"flex flex-row"}>
                        <p className={"card-title text-sm mt-2"}>GO ONLINE</p>
                      </div>
                      <div className={"flex flex-row"}>
                        <button className={"mt-2 option-color p-2 text-white flex text-sm curved-all-semi"}>ACTIVATE</button>
                      </div>
                    </>
                  )
                }
                {
                  (accountState === 1 || accountState === 2 ) && (
                    <>
                      <div className={"flex flex-row"}>
                        <p className={"card-title text-sm mt-2"}>GO OFFLINE</p>
                      </div>
                      <div className={"flex flex-row"}>
                        <button className={"mt-2 option-color p-2 text-white flex text-sm curved-all-semi"}>OFFLINE</button>
                      </div>
                    </>
                  )
                }
              </div>
              <p className={"card-title text-sm mt-2"}></p>
            </div>
            <div className={"dark-secondary-background w-full p-2 curved-bottom-corners"}></div>
          </div>
        </div>
      </div>
      <div className={"flex"}></div>
    </div>
  )
}