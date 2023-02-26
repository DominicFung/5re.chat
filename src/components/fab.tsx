import React, { CSSProperties } from "react"
import { css } from "../util"
//import s from './fab.module.css'

interface FabProps {
  setOpen: (b: boolean) => void
}

function c(...styles: React.CSSProperties[]): React.CSSProperties {
  let style = {
    "--tw-ring-shadow": "0 0 #0000",
    "--tw-ring-offset-shadow": "0 0 #0000",
  } as {[k: string]: React.CSSProperties}

  console.log(styles)
  for (const s of styles) {
    console.log(`style: ${JSON.stringify(s)}`)
    if (s)
      for (const k of Object.keys(s)) {
        style[k] = (s as any)[k] as React.CSSProperties
      }
  }
  console.log(JSON.stringify(style, null, 2))
  return style
}

export const Fab = (props: FabProps) => {
  return (
    <div style={css("fixed bottom-5 right-5")}>
        <button onClick={() => { props.setOpen(true) }}
          style={css("p-0 w-16 h-16 bg-blue-600 rounded-full hover:bg-blue-700 active:shadow-lg shadow transition ease-in duration-200 focus:outline-none text-white")}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" style={css("w-6 h-6 inline-block")}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </button>
      </div>
  )
}