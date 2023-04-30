import {useState} from "react";

export default function ChatCustomization(props) {
  const handleChangeNavBackground = (e) => {
    const newInfo = props.chatSettings
    newInfo.nav.background = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeNavTitle = (e) => {
    const newInfo = props.chatSettings
    newInfo.nav.title = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeNavSubtitle = (e) => {
    const newInfo = props.chatSettings
    newInfo.nav.subtitle = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeBotBackground = (e) => {
    const newInfo = props.chatSettings
    newInfo.botTexting.background = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeBotText = (e) => {
    const newInfo = props.chatSettings
    newInfo.botTexting.text = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeBotBorder = (e) => {
    const newInfo = props.chatSettings
    newInfo.botTexting.border = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeUserBackground = (e) => {
    const newInfo = props.chatSettings
    newInfo.userTexting.background = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeUserText = (e) => {
    const newInfo = props.chatSettings
    newInfo.userTexting.text = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeUserBorder = (e) => {
    const newInfo = props.chatSettings
    newInfo.userTexting.border = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeButtonBackground = (e) => {
    const newInfo = props.chatSettings
    newInfo.userbutton.background = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeButtonText = (e) => {
    const newInfo = props.chatSettings
    newInfo.userbutton.text = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeButtonBorder = (e) => {
    const newInfo = props.chatSettings
    newInfo.userbutton.border = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeInputButton = (e) => {
    const newInfo = props.chatSettings
    newInfo.inputSend.button = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  const handleChangeInputText = (e) => {
    const newInfo = props.chatSettings
    newInfo.inputSend.text = e.target.value
    props.setChatSettings(newInfo)
    props.setCounter(props.counter + 1)
  }

  return (
    <div className={"w-full flex flex-col justify-between curved-all card-background outer-shadow"}>
      <div className={"w-full flex flex-col p-5"}>
        {
          !props.editor && (
            <p className={"card-title text-sm purple-border-bottom p-2"}>Chat bot customization</p>
          )
        }
        {
          props.editor && props.editor === 1 && (
            <p className={"card-title text-sm purple-border-bottom p-2"}>Nav Bar Customization</p>
          )
        }
        {
          props.editor && props.editor === 2 && (
            <p className={"card-title text-sm purple-border-bottom p-2"}>Bot text box customization</p>
          )
        }
        {
          props.editor && props.editor === 3 && (
            <p className={"card-title text-sm purple-border-bottom p-2"}>User text box customization</p>
          )
        }
        {
          props.editor && props.editor === 4 && (
            <p className={"card-title text-sm purple-border-bottom p-2"}>User Button Customization</p>
          )
        }
        {
          props.editor && props.editor === 5 && (
            <p className={"card-title text-sm purple-border-bottom p-2"}>Text bot customization</p>
          )
        }

        {
          props.editor && props.editor === 1 && (
            <div className={"flex flex-col mt-2"}>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>Nav Bar Colour:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeNavBackground} value={props.chatSettings.nav.background} className={"purple-input w-full h-full"}/>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>Nav Bar Title:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeNavTitle} value={props.chatSettings.nav.title} className={"purple-input w-full h-full"}/>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>Nav Bar Sub title:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeNavSubtitle} value={props.chatSettings.nav.subtitle} className={"purple-input w-full h-full"}/>
                </div>
              </div>
            </div>
          )
        }

        {
          props.editor && props.editor === 2 && (
            <div className={"flex flex-col mt-2"}>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>Bot Texting Background:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeBotBackground} value={props.chatSettings.botTexting.background} className={"purple-input w-full h-full"}/>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>Bot Texting Text:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeBotText} value={props.chatSettings.botTexting.text} className={"purple-input w-full h-full"}/>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>Bot Texting Border:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeBotBorder} value={props.chatSettings.botTexting.border} className={"purple-input w-full h-full"}/>
                </div>
              </div>
            </div>
          )
        }

        {
          props.editor && props.editor === 3 && (
            <div className={"flex flex-col mt-2"}>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>User Texting Background:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeUserBackground} value={props.chatSettings.userTexting.background} className={"purple-input w-full h-full"}/>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>User Texting Text:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeUserText} value={props.chatSettings.userTexting.text} className={"purple-input w-full h-full"}/>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>User Button Border:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeUserBorder} value={props.chatSettings.userTexting.border} className={"purple-input w-full h-full"}/>
                </div>
              </div>
            </div>
          )
        }

        {
          props.editor && props.editor === 4 && (
            <div className={"flex flex-col mt-2"}>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>User Button Background:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeButtonBackground} value={props.chatSettings.userbutton.background} className={"purple-input w-full h-full"}/>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>User Button Text:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeButtonText} value={props.chatSettings.userbutton.text} className={"purple-input w-full h-full"}/>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>User Texting Border:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeButtonBorder} value={props.chatSettings.userbutton.border} className={"purple-input w-full h-full"}/>
                </div>
              </div>
            </div>
          )
        }
        {
          props.editor && props.editor === 5 && (
            <div className={"flex flex-col mt-2"}>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>Send Button Color:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeInputButton} value={props.chatSettings.inputSend.button} className={"purple-input w-full h-full"}/>
                </div>
              </div>
              <div className={"flex flex-row"}>
                <p className={"card-title text-sm  p-2 flex flex-1"}>Send Input Text:</p>
              </div>
              <div className={"flex flex-row pr-2 pl-2"}>
                <div className={"flex pt-5 pb-5"}></div>
                <div className={"flex flex-1"}>
                  <input type={"color"} onChange={handleChangeInputText} value={props.chatSettings.inputSend.text} className={"purple-input w-full h-full"}/>
                </div>
              </div>
            </div>
          )
        }
        <div className={"flex flex-row p-2"}>
          <button onClick={props.updateChatCustom} className={"option-color pl-2 pr-2 text-white"}>UPDATE</button>
        </div>

      </div>
      <div className={"dark-secondary-background w-full p-2 curved-bottom-corners"}>
      </div>
    </div>
  )
}