import { useState } from 'react'
import './App.css'
import { Chat } from './components/chat'
import { Fab } from './components/fab'

function App() {
  const [open, setOpen] = useState(false)

  return (
    <div className="App">
      <Fab setOpen={setOpen} />
      <Chat open={open} />
    </div>
  )
}

export default App
