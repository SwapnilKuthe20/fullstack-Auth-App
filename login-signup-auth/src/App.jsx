import React from 'react'
import './App.css'
import { Route, Routes } from 'react-router-dom'
import Login from './frontend/Components/Login'
import Signup from './frontend/Components/Signup'
import Dashboard from './frontend/Components/Dashboard'
// import TestAccess from './frontend/Components/TestAccess'

const App = () => {

  return (
    <>
      <Routes>
        {/* <Route path="/" element={<TestAccess />} /> */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

export default App
