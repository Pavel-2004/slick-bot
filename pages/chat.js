import DisplayChatCurr from "../components/DisplayChatCurr";
import DisplayActiveChat from "../components/DisplayActiveChat";
import DisplayChatControl from "../components/DisplayChatControl";

export default function Chat() {
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
      <div className={"flex flex-1 flex-row mt-10 mb-10 pl-10 pr-10 min-h-full"} style={{overflow: "auto"}}>
        <div className={"flex flex-1 p-2"}>
          <DisplayActiveChat />
        </div>
        <div className={"flex flex-1 p-2"}>
          <DisplayChatCurr />
        </div>
        <div className={"flex flex-1 p-2"}>
          <DisplayChatControl />
        </div>
      </div>
    </div>
  )
}