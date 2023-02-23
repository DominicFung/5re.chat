import React, { useEffect, useState } from "react"
import { css } from "../util"

// @ts-ignore
import awsConfig from '../aws-exports'
import { Amplify, API, graphqlOperation } from 'aws-amplify'
import { GraphQLResult } from '@aws-amplify/api'

import * as m from '../graphql/mutations'
import { Convo, _Message } from "../API"


interface ChatProps {
  open: boolean
  setOpen: (b: boolean) => void
  apiKey?: string | undefined
  sessionToken?: string | undefined
}

export const Chat = (props: ChatProps) => {
  const [ loading, setLoading ] = useState(true)
  const [ messages, setMessages ] = useState<_Message[]>([])

  const [ text, setText ] = useState("")
  const [ convo, setConvo ] = useState<Convo>()

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
    if (d.data?.createSession)
      setConvo( d.data?.createSession )
  }

  const message = async (message: string) => {
    const d = await API.graphql(graphqlOperation(m.addCustomerMessage, {
      sessionToken: convo?.sessionToken, message
    }))
    console.log(d)

    setMessages([...messages, {
      sendDate: "",
      userType: "CUSTOMER",
      message: message
    } as _Message])
  }

  useEffect(() => {
    if (props.open && props.apiKey && !convo) {
      getSessionTokenUsingApiKey()
    }
  }, [props, convo])

  return (<>
    {props.open && <div style={css("fixed bottom-0 right-10 w-80")}>
        <div style={css("flex flex-col flex-grow w-full max-w-xl bg-white shadow-xl rounded-t-lg overflow-hidden h-96")}>
          <div style={css("flex flex-row bg-blue-500")}>
            <div style={css("flex-grow")} />
            <button style={css("p-1 text-white")} onClick={() => { props.setOpen(false) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={css("w-6 h-6")}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 12H6" />
              </svg>
            </button>
            <button style={css("p-1 text-white")} onClick={() => { props.setOpen(false) }}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={css("w-6 h-6")}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          <div style={css("flex flex-col flex-grow h-0 p-4 overflow-auto")}>
            { messages.map((m) => {
              if (m.userType === "OWNER") {
                return (
                  <div className="space-x-3" style={css("flex w-full mt-2 space-x-3 max-w-xs")}>
                    <div style={css("flex-shrink-0 h-10 w-10 rounded-full bg-gray-300")}></div>
                    <div>
                      <div style={css("bg-gray-300 p-3 rounded-r-lg rounded-bl-lg")}>
                        <p style={css("text-sm")}>{m.message}</p>
                      </div>
                      <span style={css("text-xs text-gray-500 leading-none")}>{m.sendDate}</span>
                    </div>
                  </div>
                )
              } else if (m.userType === "CUSTOMER") {
                return (
                  <div style={css("flex w-full mt-2 space-x-3 max-w-xs ml-auto justify-end")}>
                    <div className="mx-3">
                      <div style={css("bg-blue-600 text-white p-3 rounded-l-lg rounded-br-lg")}>
                        <p style={css("text-sm")}>{m.message}</p>
                      </div>
                      <span style={css("text-xs text-gray-500 leading-none")}>{m.sendDate}</span>
                    </div>
                    <div className="mx-3" style={css("flex-shrink-0 h-10 w-10 rounded-full bg-gray-300")}></div>
                  </div>
                )
              }

              return <></>
            })}
          </div>
          
          <div style={css("bg-blue-300 p-4")}>
            <label htmlFor="search" className="mb-2 text-sm font-medium text-gray-900 sr-only">Type your message…</label>
            <div className="relative">
                <input type="search" id="search" placeholder="Type your message…" value={text} onChange={(e) => {setText(e.currentTarget.value)}}
                  className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500" />
                <button type="submit" onClick={() => { message(text) }}
                    className="text-white absolute right-2.5 bottom-1.5 bg-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                  </svg>
                </button>
            </div>
            {/* <input style={css("flex items-center h-10 w-full rounded px-3 text-sm")} type="text" placeholder="Type your message…" /> */}
          </div>
        </div>
      </div>}
  </>)
}