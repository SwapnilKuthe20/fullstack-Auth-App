import { Navigate, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'

function App() {

  return (
    <div className='bg-black w-full h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/login' element={<Login />} />
        <Route path='/home' element={<Home />} />
      </Routes>
      <ToastContainer theme='dark' />
    </div>
  )
}

export default App
