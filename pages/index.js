import {useState} from "react";
import styles from '../styles/Home.module.css'
import Control from "../components/Control";
import DisplayChat from "../components/DisplayChat";

export default function Home() {
  const [counter, setCounter] = useState(1)
  const [prechats, setPrechats] = useState([{type: "answer", first: true, id: 1}])
  const [currAnswer, setCurrAnswer] = useState(1)
  const [highestId, setHighestId] = useState(1)
  const [stateCounter, setStateCounter] = useState(0)

  const handleBack = () => {
    var parentId
    prechats.forEach(chat => {
      if (chat.id === currAnswer && !chat.first) {
        parentId = chat.parent
      }
    })

    setCurrAnswer(parentId)
  }

  console.log(prechats)

  return (
      <div className={"min-h-screen w-full flex flex-col primary-background"}>
        <div className={"flex flex-1 flex-col"}>
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
        <div className={"flex flex-row pl-10 pr-10"}>
            <div className={"flex flex-1 mr-5"}>
                <DisplayChat prechats={prechats} currAnswer={currAnswer} setCurrAnswer={setCurrAnswer} />
            </div>
            <div className={"flex flex-1 ml-5"}>
              <Control handleBack={handleBack} currAnswer={currAnswer} prechats={prechats} setPrechats={setPrechats} stateCounter={stateCounter} setStateCounter={setStateCounter} highestId={highestId} setHighestId={setHighestId} />
            </div>
        </div>
        <div className={"flex flex-1"}></div>
      </div>
  )
}
