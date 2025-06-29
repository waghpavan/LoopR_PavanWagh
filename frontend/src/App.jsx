 import {BrowserRouter as Router, Routes,Route, BrowserRouter} from "react-router-dom"
import { useState } from 'react'
import {Signup} from './pages/Signup'
import {Signin} from './pages/Signin'
import {Dash} from './pages/Dash'
 import { Landing } from './pages/Landing'
 import {Transactions} from'./pages/Transaction'


import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
     <BrowserRouter>
         <Routes >
        <Route path='/' element={<Landing/>}/>
          <Route path="/signup" element={<Signup/>} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/dash" element={<Dash/>} />
          <Route path="/Transactions" element={<Transactions/>}/>
        </Routes>
      </BrowserRouter>

    </div>
  )
}

export default App
