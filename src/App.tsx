import { useEffect, useState } from 'react'
import { FireChat } from './components/chat'
import { Fab } from './components/fab'

import secret from '../secret.json'

const TEST_API = true
const TEST_CASE = 1

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
      {  TEST_API && <FireChat control={{open, setOpen}} apiKey={secret.apiKey} avatarImageUrl="https://avatars.githubusercontent.com/oa/2112735?s=140&u=88a6f5c863be9c943fd6e24dc0f12fb83e107b09&v=4"/> }
      { !TEST_API && <FireChat control={{open, setOpen}} sessionToken={sessionToken}/> }
    </div>
  )
}

export default App
