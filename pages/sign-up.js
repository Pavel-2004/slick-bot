import {useState} from "react";

export default function() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSignUp = () => {
    setLoading(true)
    fetch("/api/auth/sign-up",{
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({email, password})
    })
      .then(user => {
        return user.text()
      })
      .then(user => {
        return JSON.parse(user)
      })
      .then(user => {
        console.log(user)
        if (user.error) {
          setError("")
          setLoading(false)
          window.location.href = "/dashboard"
        }
        else {
          console.log('here')
          localStorage.setItem("user", email)
          localStorage.setItem("password", password)
          setLoading(false)
          window.location.href = "/dashboard"
        }
      })
  }

  return (
    <div className={"min-h-screen w-full flex flex-col primary-background"}>
      <div className={"flex flex-col"}>
        <div className={"w-full bg-nav flex flex-row justify-center curved-bottom-corners"}>
          <p className={"text-white text-3xl ml-5 nav-text"}>SlickBot</p>
        </div>
      </div>
      <div className={"flex flex-1 flex-col justify-center min-h-full"} >
        <div className={"flex flex-row justify-center border-2"}>
          <div className={"flex flex-1"}></div>
          <div className={"flex-1 flex-col secondary-background curved-all card-background outer-shadow"}>
            <div className={"w-full flex flex-col p-5"}>
              <p className={"card-title text-sm purple-border-bottom p-2"}>Sign UP</p>
              <div className={"flex flex-row"}>
                <input onChange={e => setEmail(e.target.value)} value={email} placeholder={"Email"} className={"purple-input p-2 flex-1 mt-2"} />
              </div>
              <div className={"flex flex-row"}>
                <input onChange={e => setPassword(e.target.value)} value={password} type={"password"} placeholder={"Password"} className={"purple-input p-2 flex-1 mt-2"} />
              </div>
              <div className={"flex flex-row"}>
                <button onClick={handleSignUp} className={"dark-secondary-background p-2 flex-1 curved-all-semi text-white font-bold mt-2"}>SIGN UP</button>
              </div>
              <div className={"flex flex-row mt-2"}>
                <div className={"flex-1 purple-border-bottom my-auto"}></div>
                <div className={"flex pl-2 pr-2"}>
                  <p className={"nav-text"}>OR</p>
                </div>
                <div className={"flex-1 purple-border-bottom my-auto"}></div>
              </div>
              <div className={"flex flex-row mt-2"}>
                <button onClick={() => {window.location.href = "/login"}} className={"flex-1"}><p className={"nav-text font-bold"}>login</p></button>
              </div>
            </div>
            <div className={"dark-secondary-background w-full p-2 curved-bottom-corners"}></div>
          </div>
          <div className="flex flex-1"></div>
        </div>
      </div>
    </div>
  )
}