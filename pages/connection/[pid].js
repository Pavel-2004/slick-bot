import {useState} from "react";
import {useRouter} from "next/router";
import {useConnection} from "../../hooks/workflow";
import {useNav} from "../../hooks/nav";

export default function () {
  const [code, setCode] = useState("1231231")
  const [codeAuth, setCodeAuth] = useState("adasad112")
  const router = useRouter()
  const { pid } = router.query
  const [users, userEmail, setUserEmail, userRank, setUserRank, addUser, workflowKey, workflowUserKey] = useConnection(pid)
  const [workflows, changeWorkflow, displayOptions, handleToggleOptions] = useNav(pid)


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
      <div className={"min-h-screen w-full flex flex-col primary-background"}>
        <div className={"flex flex-col"}>
          <div className={"w-full bg-nav flex flex-row justify-between curved-bottom-corners"}>
            <div className={"w-full flex flex-row justify-between curved-bottom-corners p-5"}>
            </div>
          </div>
        </div>
        <div className={"flex flex-1 flex-row mt-10 mb-10 pl-10 pr-10"}>
          <div className={"flex flex-1"}>
            <div className={"w-full flex flex-col justify-between secondary-background curved-all card-background outer-shadow"}>
              <div className={"w-full flex flex-col p-5"}>
                <p className={"card-title text-sm purple-border-bottom p-2"}>Connection</p>
                {
                  workflowUserKey && workflowKey && (
                    <>
                      <p className={"card-title text-sm mt-2"}>Connect To Slack</p>
                      <p className={"secondary-text text-md mt-2"}>Install our slack app and add the bot to a channel where the bot could be active.
                        Then, enter the following chat into the channel to login.
                      </p>
                      <div className={"w-full bg-slate-600 p-1"}>
                        <p className={"text-black text-md font-bold"}>slick -u {workflowUserKey} -p {workflowKey}</p>
                      </div>
                    </>
                  )
                }
                <p className={"card-title text-sm mt-2"}>Invite user to workplace:</p>
                <div className={"w-full flex flex-row"}>
                  <input value={userEmail} onChange={e => setUserEmail(e.target.value)} className={"purple-input w-full flex-1"} placeholder={"Enter Email"} />
                  <button onClick={addUser} className={"option-color p-1 flex"}>ADD</button>
                </div>
                <div className={"w-full flex flex-row mt-2"}>
                  {
                    userRank === "admin" && (
                      <>
                        <button
                          onClick={() => {
                            setUserRank("admin")
                          }}
                          className={"option-color flex flex-col mr-2 p-1"}>
                          <div className={"flex flex-row"}>
                            <p className={"text-md text-white text-center"}>ADMIN</p>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setUserRank("user")
                          }}
                          className={"flex flex-col ml-2 p-1"}>
                          <div className={"flex flex-row"}>
                            <p className={"text-md text-center"}>USER</p>
                          </div>
                        </button>
                      </>
                    )
                  }
                  {
                    userRank === "user" && (
                      <>
                        <button
                          onClick={() => {
                            setUserRank("admin")
                          }}
                          className={"flex flex-col mr-2 p-1"}>
                          <div className={"flex flex-row"}>
                            <p className={"text-md text-center"}>ADMIN</p>
                          </div>
                        </button>
                        <button
                          onClick={() => {
                            setUserRank("user")
                          }}
                          className={"option-color flex flex-col ml-2 p-1"}>
                          <div className={"flex flex-row"}>
                            <p className={"text-md text-white text-center"}>USER</p>
                          </div>
                        </button>
                      </>
                    )
                  }
                </div>
                <div className={"w-full flex flex-col mt-2"}>
                  <div className={"flex flex-row"}>
                    <p className={"card-title"}>CURRENT USERS</p>
                  </div>
                  {
                    users.map(user => {
                      return (
                        <div className={"flex flex-row"}>
                          <p className={"text-md"}>
                            {user.email}
                          </p>
                          {
                            user && !user.admin && (
                              <p className={"text-md text-orange-500 mr-2"}>
                                Regular User
                              </p>
                            )
                          }
                          {
                            user && user.admin && (
                              <p className={"text-md text-orange-500 ml-2"}>
                                Admin
                              </p>
                            )
                          }
                        </div>
                      )
                    })
                  }
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}