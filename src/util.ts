const tailwind = {
  "hr": { height: 0, color: "inherit", borderTopWidth: "1px" },

  "fixed": { position: "fixed" },
  "absolute": { position: "absolute" },
  "relative": { position: "relative" },

  "bottom-0": { bottom: "0px" },
  "bottom-1": { bottom: "0.25rem" },
  "bottom-1.5": { bottom: "0.375rem" },
  "bottom-5": { bottom: "1.25rem" },

  "right-2": { right: "0.5rem" },
  "right-2.5": { right: "0.625rem" },
  "right-5": { right: "1.25rem" },
  "right-10": { right: "2.5rem" },

  "mt-2": { marginTop: "0.5rem" },
  "ml-auto": { marginLeft: "auto" },
  "inline-block": { display: "inline-block" },
  
  "flex": { display: "flex" },
  "flex-shrink-0": { flexShrink: 0 },
  "flex-grow": { flexGrow: 1 },
  "flex-row": { flexDirection: "row" },
  "flex-col": { flexDirection: "column" },
  
  "items-center": { alignItems: "center" },
  "justify-end": { justifyContent: "flex-end" },
  
  "space-x-3": { // ISSUE HERE PLEASE CHECK.. ">" missing
    "--tw-space-x-reverse": 0,
    marginRight: "calc(0.75rem * var(--tw-space-x-reverse))",
    marginLeft: "calc(0.75rem * calc(1 - var(--tw-space-x-reverse)))",

     "& div": {
        "--tw-space-x-reverse": 0,
        marginRight: "calc(0.75rem * var(--tw-space-x-reverse))",
        marginLeft: "calc(0.75rem * calc(1 - var(--tw-space-x-reverse)))",
     } 
  },
  
  "overflow-auto": { overflow: "auto" },
  "overflow-hidden": { overflow: "hidden" },

  "p-0": { padding: 0 },
  "p-1": { padding: "0.25rem" },
  "p-2": { padding: "0.5rem" },
  "p-3": { padding: "0.75rem" },
  "p-4": { padding: "1rem" },
  "px-3": { 
    paddingLeft: "0.75rem",
    paddingRight: "0.75rem"
  },
  
  "h-0": { height: "0px" },
  "h-6": { height: "1.5rem" },
  "h-10": { height: "2.5rem" },
  "h-16": { height: "4rem" },
  "h-96": { height: "24rem" },

  "w-6": { width: "1.5rem" },
  "w-10": { width: "2.5rem" },
  "w-16": { width: "4rem" },
  "w-80": { width: "20rem" },
  "w-full": { width: "100%" },

  "max-w-xs": { maxWidth: "20rem" },
  "max-w-xl": { maxWidth: "36rem" },

  "rounded-full": { borderRadius: "9999px" },
  "rounded": { borderRadius: "0.25rem" },
  "rounded-t-lg": {
    borderTopLeftRadius: "0.5rem",
    borderTopRightRadius: "0.5rem"
  },
  "rounded-r-lg": {
    borderTopRightRadius: "0.5rem",
    borderBottomRightRadius: "0.5rem"
  },
  "rounded-l-lg": {
    borderTopLeftRadius: "0.5rem",
    borderBottomLeftRadius: "0.5rem"
  },
  "rounded-bl-lg": {
    borderBottomLeftRadius: "0.5rem"
  },
  "rounded-br-lg": {
    borderBottomRightRadius: "0.5rem"
  },

  "bg-white": {
    "--tw-bg-opacity": 1,
    backgroundColor: "rgb(255 255 255 / var(--tw-bg-opacity))"
  },
  "bg-gray-300": {
    "--tw-bg-opacity": 1,
    backgroundColor: "rgb(209 213 219 / var(--tw-bg-opacity))"
  },
  "bg-blue-300": {
    "--tw-bg-opacity": 1,
    backgroundColor: "rgb(147 197 253 / var(--tw-bg-opacity))"
  },
  "bg-blue-500": {
    "--tw-bg-opacity": 1,
    backgroundColor: "rgb(59 130 246 / var(--tw-bg-opacity))"
  },
  "bg-blue-600": {
    "--tw-bg-opacity": 1,
    backgroundColor: "rgb(59 130 246 / var(--tw-bg-opacity))"
  },
  "hover:bg-blue-700": {
    "&:hover": {
      "--tw-bg-opacity": 1,
      backgroundColor: "rgb(29 78 216 / var(--tw-bg-opacity))"
    }
  },

  "active:shadow-lg": {
    "&:active": {
      "--tw-shadow": "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
      "--tw-shadow-colored": "0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color)",
      boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"
    }
  },
  "shadow": {
    "--tw-shadow": "0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)",
    "--tw-shadow-colored": "0 1px 3px 0 var(--tw-shadow-color), 0 1px 2px -1px var(--tw-shadow-color)",
    boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"
  },
  "shadow-xl": {
    "--tw-shadow": "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
    "--tw-shadow-colored": "0 20px 25px -5px var(--tw-shadow-color), 0 8px 10px -6px var(--tw-shadow-color)",
    boxShadow: "var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow)"
  },
  "transition": {
    transitionProperty: `color, background-color, border-color,
    text-decoration-color, fill, stroke, opacity, box-shadow, transform, filter,
    backdrop-filter, -webkit-backdrop-filter`,
    transitionTimingFunction: "cubic-bezier(0.4, 0, 0.2, 1)",
    transitionDuration: "0.15s"
  },
  "ease-in": {
    transitionTimingFunction: "cubic-bezier(0.4, 0, 1, 1)"
  },
  "duration-200": {
    transitionDuration: "0.2s"
  },
  "focus:outline-none": {
    "&:focus": {
      outline: "2px solid transparent",
      outlineOffset: "2px"
    }
  },

  "text-white": {
    "--tw-text-opacity": 1,
    color: "rgb(255 255 255 / var(--tw-text-opacity))"
  },
  "text-gray-500": {
    "--tw-text-opacity": 1,
    color: "rgb(107 114 128 / var(--tw-text-opacity))"
  },

  "text-sm": {
    fontSize: "0.875rem",
    lineHeight: "1.25rem"
  },
  "text-xs": {
    fontSize: "0.75rem",
    lineHeight: "1rem"
  },
  "leading-none": {
    lineHeight: 1
  }
  
}

type Tailwind = keyof typeof tailwind

export function css(css: string): React.CSSProperties {
  let style = {
    "--tw-ring-shadow": "0 0 #0000",
    "--tw-ring-offset-shadow": "0 0 #0000",
  } as {[k: string]: React.CSSProperties}

  //console.log(css)
  const styles = css.split(" ") as Tailwind[]

  for (const s of styles) {
    if (tailwind[s])
      for (const k of Object.keys(tailwind[s])) {
        style[k] = (tailwind[s] as any)[k] as React.CSSProperties
      }
    else console.warn(`missing style: "${s}"`)
  }
  //console.log(JSON.stringify(style, null, 2))
  return style
}