import { useState } from 'react'
import React from 'react'
import {cors} from 'cors'
import {axios} from 'axios'
import { mysql } from 'mysql2'
import { jwt, sign } from jsonwebtoken
import { bcrypt, hash } from "bcrypt" 


import './App.css'

const baseURL = "http://localhost:3000"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={() => setCount((count) => count + 1)}>
        count is {count}
      </button>
    </>
  )
}

export default App
