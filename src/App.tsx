import { useEffect, useState } from 'react'
import { Chat } from './components/chat'
import { Fab } from './components/fab'

import secret from '../secret.json'

const TEST_API = true

function App() {
  const [open, setOpen] = useState(false)
  const [ sessionToken, setSessionToken ] = useState<string>()

  useEffect(() => {
    setTimeout(() => {
      setSessionToken("")
    }, 500)
  }, [])

  return (
    <div className="App">
      <Fab setOpen={setOpen} />
      {  TEST_API && <Chat open={open} setOpen={setOpen} apiKey={secret.apiKey}/> }
      { !TEST_API && <Chat open={open} setOpen={setOpen} sessionToken={sessionToken}/> }
    </div>
  )
}

export default App
