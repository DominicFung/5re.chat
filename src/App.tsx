import { useEffect, useState } from 'react'
import { FireChat } from './components/chat'
import { Fab } from './components/fab'

import secret from '../secret.json'

const TEST_API = true

function App() {
  const [ open, setOpen ] = useState(false)
  const [ sessionToken, setSessionToken ] = useState<string>()

  const [ testcase, _setTestCase ] = useState<number>(4)

  useEffect(() => {
    setTimeout(() => {
      setSessionToken("")
    }, 500)
  }, [])

  return (
    <div className="App">
      {/** CASE 1: bring your own FAB */}
      { testcase === 1 && <Fab setOpen={setOpen} /> }
      { TEST_API && testcase === 1 && <FireChat control={{open, setOpen}} apiKey={secret.apiKey} /> }
      {!TEST_API && testcase === 1 && <FireChat control={{open, setOpen}} sessionToken={sessionToken}/> }

      {/** CASE 2: test avatar Image */}
      { TEST_API && testcase === 2 &&
        <FireChat apiKey={secret.apiKey} avatarImageUrl="https://avatars.githubusercontent.com/oa/2112735?s=140&u=88a6f5c863be9c943fd6e24dc0f12fb83e107b09&v=4"/> }
      {!TEST_API && testcase === 2 &&
        <FireChat sessionToken={sessionToken} avatarImageUrl="https://avatars.githubusercontent.com/oa/2112735?s=140&u=88a6f5c863be9c943fd6e24dc0f12fb83e107b09&v=4"/> } 

      {/** CASE 3: starter text */}
      { TEST_API && testcase === 3 &&
        <FireChat apiKey={secret.apiKey} 
          convoStarter={"Welcome to 🔥 Chat! This is a testing implementation, please do NOT enter any personal (sensitive) info or profane text. You can add yourself to our discord server and view it at work!"}
          avatarImageUrl="https://avatars.githubusercontent.com/oa/2112735?s=140&u=88a6f5c863be9c943fd6e24dc0f12fb83e107b09&v=4"/> }
      {!TEST_API && testcase === 3 &&
        <FireChat sessionToken={sessionToken} 
          convoStarter={"Welcome to 🔥 Chat! This is a testing implementation, please do NOT enter any personal (sensitive) info or profane text. You can add yourself to our discord server and view it at work!"}
          avatarImageUrl="https://avatars.githubusercontent.com/oa/2112735?s=140&u=88a6f5c863be9c943fd6e24dc0f12fb83e107b09&v=4"/> } 

      {/** CASE 4: starter text */}
      { TEST_API && testcase === 4 &&
        <FireChat apiKey={secret.apiKey} 
          convoStarter={"Welcome to 🔥 Chat! This is a testing implementation, please do NOT enter any personal (sensitive) info or profane text. You can add yourself to our discord server and view it at work!"}
          avatarImageUrl="https://avatars.githubusercontent.com/oa/2112735?s=140&u=88a6f5c863be9c943fd6e24dc0f12fb83e107b09&v=4"
          style={{ chat: {
              main: {color: "blue", shade: 500 }
            }}}
        /> }
      {!TEST_API && testcase === 4 &&
        <FireChat sessionToken={sessionToken} 
          convoStarter={"Welcome to 🔥 Chat! This is a testing implementation, please do NOT enter any personal (sensitive) info or profane text. You can add yourself to our discord server and view it at work!"}
          avatarImageUrl="https://avatars.githubusercontent.com/oa/2112735?s=140&u=88a6f5c863be9c943fd6e24dc0f12fb83e107b09&v=4"/> } 
    </div>
  )
}

export default App
