import React from "react"
import s from './fab.module.css'

interface FabProps {
  setOpen: (b: boolean) => void
}

function c(...classes: any) { return classes.join(" ")}

export const Fab = (props: FabProps) => {
  return (
    <div className={c(s.fixed, s.bottom5, s.right5)}>
        <button onClick={() => { props.setOpen(true) }}
          className={c(s.p0, s.w16, s.h16, s.bgBlue600, s.roundedFull, s.hoverBgBlue700, s.activeShadowLg, s.mouse, s.shadow, s.transition, s.easeIn, s.duration200, s.focusOutlineNone, s.textWhite)}>
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className={c(s.w6, s.h6, s.inlineBlock)}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 01.778-.332 48.294 48.294 0 005.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </button>
      </div>
  )
}