import { useState } from 'react'
import './App.css'
import Todos from '../src/components/Todos'

function App() {
  const [todos, setTodos] = useState([])

  return (
    <>
      <Todos />
    </>
  )
}

export default App
