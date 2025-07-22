import React from 'react'
import './App.css'
import Login from './Components/Login'
import Signup from './Components/SignUp'
import Dashboard from './Components/Dashboard'
import { Route, Router, Routes } from 'react-router-dom'

function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
