import {useState} from "react";
import {useWorflow} from "../hooks/workflow";

export default function Dashboard() {
  const [name, setName] = useState("")
  const [adding, setAdding] = useState(false)
  const [workflows, addWorkflow, userId] = useWorflow()
  const handleAdd = () => {
    addWorkflow(name, setName)
    setAdding(false)
  }

  const checkAdminWorkflow = (workflowIndex) => {
    var admin = false
    console.log(workflows, workflowIndex)
    workflows[workflowIndex].users.forEach(user => {
      if (user.admin && user.id === userId) {
        admin = true
      }
    })
    return admin
  }

  return (
    <>
      {
        adding && (
          <>
            <div className={"fixed top-0 left-0 h-screen w-full"} style={{zIndex: 1, backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
            </div>
            <div className={"fixed top-0 left-0 h-screen w-full flex flex-col justify-center"} style={{zIndex: 2}}>
              <div className={"flex flex-row p-2"}>
                <div className={"hidden lg:flex-1"}></div>
                <div className={"flex flex-1 flex-col bg-white secondary-background curved-all card-background outer-shadow"}>
                  <p className={"card-title text-sm purple-border-bottom p-2"}>New Workplace</p>
                  <div className={"p-2"}>
                    <input onChange={e => setName(e.target.value)} value={name} className={"purple-input w-full p-1"} placeholder={"Enter Name"} />
                    <div className={"flex flex-row w-full mt-2"}>
                      <button className={"bg-red-500 mr-1 p-2 text-white"} onClick={() => {setAdding(false)}}>CANCEL</button>
                      <button  className={"bg-green-500 ml-1 p-2 text-white"} onClick={handleAdd}>ADD</button>
                    </div>
                  </div>
                </div>
                <div className={"hidden lg:flex-1"}></div>
              </div>
            </div>
          </>
        )
      }
      <div className={"min-h-screen w-full flex flex-col primary-background"} style={{zIndex: 0}}>
        <div className={"flex flex-col"}>
          <div className={"w-full bg-nav flex flex-row justify-between curved-bottom-corners"}>
            <div className={"flex"}>
              <p className={"text-white text-3xl ml-5 nav-text"}>SlickBot</p>
            </div>
            <div className={"flex"}>
              <p className={"text-white text-3xl mr-5 nav-text"}>Dashboard</p>
            </div>
          </div>
        </div>
        <div className={"flex flex-1 flex-col justify-center min-h-full"}>
          <div className={"flex flex-row"}>
            <div className={"flex-1 grid grid-cols-12 p-5 gap-5"}>
                {
                  workflows.map((workflow,index) => {
                    return (
                      <div className={"col-span-12 lg:col-span-4 secondary-background curved-all card-background outer-shadow"}>
                        <div className={"w-full p-2 bg-green-400"}></div>
                        <div className={"mt-2 pl-4 pr-4 pb-2"}>
                          <p className={"text-md text-center"}>
                            {workflow.name}
                          </p>
                          {
                            checkAdminWorkflow(index) && (
                              <p className={"text-md text-center mt-2"}>
                                Admin
                              </p>
                            )
                          }
                          {
                            !checkAdminWorkflow(index) && (
                              <p className={"text-md text-center mt-2"}>
                                User
                              </p>
                            )
                          }
                          <p className={"text-sm text-center mt-2 text-green-500"}>
                            ONLINE
                          </p>
                          <button onClick={() => {
                            window.location.href = "/chat-ticket/" + workflow.id
                          }} className={"mt-2 option-color w-full"}>
                            OPEN
                          </button>
                        </div>
                      </div>
                    )
                  })
                }
              <button onClick={() => {setAdding(true)}} className={"col-span-12 md:col-span-4 curved-all card-background outer-shadow"}>
                <p className={"text-center text-md my-auto"}>New Workflow</p>
                <p className={"text-center text-xl"}>+</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}