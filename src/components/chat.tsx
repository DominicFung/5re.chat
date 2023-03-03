import React, { useEffect, useState } from "react"
import { css, getBgColor, getBorderColor, getTextColor, TwColor } from "../util"

// @ts-ignore
import awsConfig from '../aws-exports'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult, GraphQLSubscription } from '@aws-amplify/api'

import * as m from '../graphql/mutations'
import { onMessage } from '../graphql/subscriptions'
import { Convo, _Message, OnMessageSubscription } from "../API"
import { Message } from "../type"

interface FireChatProps {
  apiKey?: string | undefined
  sessionToken?: string | undefined
  control?: { 
    open: boolean
    setOpen: (b: boolean) => void
  }
  style?: {
    owner?: { messageBg?: TwColor, text?: TwColor }
    customer?: { messageBg?: TwColor, text?: TwColor }
    chat?: { main?: TwColor, bg?: TwColor, text?: TwColor }
    notation?: TwColor
  }
  convoStarter?: string,
  avatarImageUrl?: string
}

export const FireChat = (props: FireChatProps) => {
  const [ open, _setOpen ] = useState(props.control?.open || false)
  const [ loading, setLoading ] = useState(true)

  const [ convo, setConvo ] = useState<Convo>()
  const [ ownerMsg, setOwnerMsg ] = useState<Message>()
  const [ messages, setMessages ] = useState<Message[]>(props.convoStarter ? [
    { sendDate: "", userType: "OWNER", message: props.convoStarter, status: "OK" } as Message,
//    { sendDate: "", userType: "CUSTOMER", message: "This is a test", status: "OK" } as Message,
  ]: [])

  const [ text, setText ] = useState("")

  const getSessionTokenUsingApiKey = async () => {
    console.warn(
      `5re.chat: Using the apiKey in the frontend is not the safest. 
          Exchange for a session token instead in your backend.
          Instructions - https://5re.chat/documentation`
    )
    
    /** Get session token */
    console.log(awsConfig)
    Amplify.configure(awsConfig)
    const d = await API.graphql(graphqlOperation(m.createSession, {
      apiKey: props.apiKey
    })) as GraphQLResult<{createSession: Convo}>
    
    console.log(d)
    if (d.data?.createSession) {
      setConvo( d.data?.createSession )
      setLoading(false)
    }
  }

  const subscribe = async (hash: string) => {
    const sub = API.graphql<GraphQLSubscription<OnMessageSubscription>>(
      graphqlOperation(onMessage, { hash })
    ).subscribe({
      next: ({provider, value}) => {
        console.log("=== MESSAGE INCOMING ===")
        console.log(JSON.stringify(provider))
        console.log(JSON.stringify(value))

        const msg = value.data?.onMessage?.message
        console.log(msg)
        console.log(convo?.messageToken)

        if (!msg) { console.error("No encrypted message"); return }
        if (!convo?.messageToken) { console.error("No messageToken"); return }
        incomingMessage(msg)
      },
      error: (error) => console.warn(error)
    })
    console.log(JSON.stringify(sub))
  }

  const incomingMessage = async (message: string) => {
    console.log(`INCOMING ==> "${message}"`)
    console.log(messages)
    setOwnerMsg({ sendDate: "", userType: "OWNER", message: message, status: "OK" } as Message)
  }

  const outgoingMessage = async (message: string) => {
    setText("")
    const msgPosition = messages.length as number
    messages.push({ sendDate: "", userType: "CUSTOMER", message: message, status: "PENDING" } as Message)
    setMessages([...messages ])

    const d = await API.graphql(graphqlOperation(m.addCustomerMessage, {
      sessionToken: convo?.sessionToken, message
    })) as GraphQLResult<{ addCustomerMessage: string }>
    console.log(d)

    if (!d.data?.addCustomerMessage) {
      messages[msgPosition].status = 'ERROR'
      console.log(messages)
      setMessages([...messages ])
      return
    } else if (d.data?.addCustomerMessage !== "OK" && d.data?.addCustomerMessage.startsWith("Fe26.2**") && convo) {
      messages[msgPosition].status = 'OK'
      convo.sessionToken = d.data?.addCustomerMessage
      console.log(`new Session: ${convo.sessionToken} / hash: ${convo.hash}`)
      subscribe(convo.hash)
      console.log(convo)
      setConvo(convo)
      setMessages([...messages ])
    } else if ( d.data?.addCustomerMessage === "OK" ) {
      messages[msgPosition].status = 'OK'
      console.log(messages)
      setMessages([...messages ])
    } else {
      messages[msgPosition].status = 'ERROR'
      console.log(messages)
      setMessages([...messages ])
    }
  }

  const setOpen = (b: boolean) => { props.control ? props.control.setOpen(b) : _setOpen(b) }

  useEffect(() => {
    if (open && props.apiKey && !convo) {
      getSessionTokenUsingApiKey()
    }
  }, [open, props, convo])

  useEffect(() => {
    if (ownerMsg) { setMessages([...messages, ownerMsg]) }
  }, [ownerMsg])

  useEffect(() => {
    if (props.control) { _setOpen(props.control.open) }
  }, [props.control?.open])

  if (typeof window !== 'undefined')  return (<>
    { !props.control && 
      <div style={css("fixed bottom-5 right-5")}>
        <button onClick={() => { setOpen(true) }}
          style={css(`p-0 w-16 h-16 ${getBgColor(props.style?.chat?.main, 600)} rounded-full hover:bg-blue-700 active:shadow-lg shadow transition ease-in duration-200 focus:outline-none text-white`)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={css("w-6 h-6 inline-block")}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </button>
      </div>
    }
    { open && 
      <div style={css("fixed bottom-0 right-10 w-80")}>
        <div style={css(`flex flex-col flex-grow w-full max-w-xl ${getBgColor(props.style?.chat?.bg, 50)} shadow-xl rounded-t-lg overflow-hidden h-96`)}>
          <div style={css(`flex flex-row ${getBgColor(props.style?.chat?.main, 600)}`)}>
            <div style={css("flex-grow")} />
            <button style={css("p-1 text-white")} onClick={() => { setOpen(false) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={css("w-6 h-6")}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
              </svg>
            </button>
            <button style={css("p-1 text-white")} onClick={() => { setOpen(false) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={css("w-6 h-6")}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div style={css("flex flex-col flex-grow h-0 p-4 overflow-auto")}>
            { messages.map((m, i) => {
              let avatar = props.avatarImageUrl ? {
                backgroundImage: `url(${props.avatarImageUrl})`,
                backgroundSize: "cover",
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center center"
              } : {}
              if (m.userType === "OWNER") {
                return (
                  <div key={i} style={css("flex w-full mt-2 max-w-xs")}>
                    {props.avatarImageUrl && <div style={{
                        ...css(`mx-2 flex-shrink-0 h-10 w-10 rounded-full ${getBgColor(props.style?.owner?.messageBg, 300)}`), 
                        ...avatar
                      }}>
                    </div>}
                    <div>
                      <div style={css(`${getBgColor(props.style?.owner?.messageBg, 300)} ${getTextColor(props.style?.customer?.text, 900)} p-2 rounded-r-lg rounded-bl-lg`)}>
                        <p style={css("text-sm")}>{m.message}</p>
                      </div>
                      <span style={css(`text-xs ${getTextColor(props.style?.notation, 200)} leading-none`)}>{m.sendDate}</span>
                    </div>
                  </div>
                )
              } else if (m.userType === "CUSTOMER") {
                return (
                  <div key={i} style={css("flex w-full mt-2 max-w-xs ml-auto justify-end")}>
                    <div>
                      <div style={css(`${getBgColor(props.style?.customer?.messageBg, 700)} ${getTextColor(props.style?.customer?.text, 50)} p-2 rounded-l-lg rounded-br-lg`)}>
                        <p style={css("text-sm")}>{m.message}</p>
                      </div>
                      <span style={css(`text-xs ${getTextColor(props.style?.notation, 200)} italic leading-none`)}>
                        {m.status==="PENDING" && "sending .."}
                      </span>
                    </div>
                  </div>
                )
              }
              return <></>
            })}
          </div>
          
          <div style={css(`${getBgColor(props.style?.chat?.main, 600)} p-1`)}>
            <label htmlFor="search" style={css("mb-2 text-sm font-medium text-gray-900 sr-only")}>Type your message…</label>
            <div style={css("relative")}>
                <input type="search" disabled={loading} id="search" placeholder="Type your message…" value={text} onChange={(e) => {setText(e.currentTarget.value)}}
                  style={css(`block w-full p-2 text-sm ${getTextColor(props.style?.chat?.text, 900)} border ${getBorderColor(props.style?.chat?.main, 600)} rounded ${getBgColor(props.style?.chat?.bg, 50)} focus:ring-blue-500 focus:border-blue-500`)}
                  onKeyDown={ (e) => { if (e.key === "Enter") { outgoingMessage(text) } } }
                />
                <button type="submit" onClick={() => { outgoingMessage(text) }}
                    style={css(`${getTextColor(props.style?.chat?.text, 600)} absolute right-0 bottom-0 font-medium text-sm px-2 py-1.5`)}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={css("w-6 h-6")}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
            </div>
          </div>
        </div>
      </div>
    }
  </>)
  return <></>
}