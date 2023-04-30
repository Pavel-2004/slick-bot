import TicketDisplay from "../../components/TicketDisplay";
import {useRouter} from "next/router";
import {useTicket} from "../../hooks/ticket";
import {useNav} from "../../hooks/nav";

export default function chatTicket() {
  const router = useRouter()
  const { pid } = router.query
  const [tickets, userId, handleAcceptChat, handleRejectChat] = useTicket(pid)
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
              className={"option-color p-1 text-white h-full text-sm ml-2 mr-2"}>tickets</button>
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
              className={"option-color p-1 text-white h-full text-2xl ml-2 mr-2"}>tickets</button>
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
          <div className={"w-full flex flex-row justify-between curved-bottom-corners p-5"}>
          </div>
        </div>
        <div className={"flex flex-1 flex-row mt-10 mb-10 pl-10 pr-10"}>
          <div className={"flex flex-1"}>
            <TicketDisplay tickets={tickets} userId={userId} handleAcceptChat={handleAcceptChat} handleRejectChat={handleRejectChat} />
          </div>
        </div>
        <div className={"flex"}></div>
      </div>
    </>
  )
}