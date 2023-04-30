export default function DisplayChatControl(props) {
  return (
    <div className={"w-full flex flex-col justify-between secondary-background curved-all card-background outer-shadow max-h-full"}>
      <div className={"w-full flex flex-1 flex-col p-2"} style={{overflowY: "auto"}}>
        <p className={"card-title text-sm purple-border-bottom p-2"}>general</p>
        <div className={"mt-2 flex flex-col h-full"} style={{overflowY: "scroll"}}>
          <div className={"flex flex-col pb-2"} style={{borderBottom: "solid", borderBottomColor: "#5B6B9E"}}>
            <p className={"nav-text text-lg"}>Name of prospect</p>
            <p className={"nav-text secondary-text text-md"}>Description Of Prospect Issue</p>
          </div>
          <div className={"mt-2 flex flex-col pb-2"} style={{borderBottom: "solid", borderBottomColor: "#5B6B9E"}}>
            <p className={"nav-text text-sm card-title"}>notes</p>
            <p className={"text-sm secondary-text"}>Note asdad asdasd a das adasa dsadadsads adsa dad asd adas dasd a asd asd asd asda das das das dasd asd as .  adsad asd a as . asd asd as.</p>
            <p className={"nav-text text-sm"}>by Name of taker</p>
            <p className={"text-sm secondary-text"}>Note asdad asdasd a das adasa dsadadsads adsa dad asd adas dasd a asd asd asd asda das das das dasd asd as .  adsad asd a as . asd asd as.</p>
            <p className={"nav-text text-sm"}>by Name of taker</p>
          </div>
          <div className={"mt-2 flex flex-col"}>
            <p className={"nav-text text-sm card-title"}>controls</p>
            <button className={"text-md bg-green-500 w-full text-white curved-all-semi"}>
              FINALIZE
            </button>
            <button className={"text-md bg-red-500 w-full text-white curved-all-semi mt-1"}>
              BAN USER
            </button>
            <input className={"w-full text-sm purple-input mt-1 p-1"} placeholder={"Enter Note on User"} />
            <div className={"flex flex-row"}>
              <div className={"flex"}>
                <button className={"text-white pl-2 pr-2 curved-all-semi mt-1"} style={{backgroundColor: "#9AA4CF"}}>ADD</button>
              </div>
            </div>
          </div>
        </div>

      </div>
      <div className={"dark-secondary-background w-full p-2 curved-bottom-corners"}>
      </div>
    </div>
  )
}