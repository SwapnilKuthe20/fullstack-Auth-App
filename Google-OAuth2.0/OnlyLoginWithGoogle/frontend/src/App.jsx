import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Home from './Components/Home'
import Login from './Components/Login'
import { ToastContainer } from 'react-toastify'
import ProtectedRoutes from './Components/ProtectedRoutes'
import NotFound from './Components/NotFound'


function App() {

  return (

    <div className='bg-black text-amber-50 flex justify-center items-center h-screen w-full'>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='*' element={<NotFound />} />
        <Route path='/home' element={<ProtectedRoutes><Home /></ProtectedRoutes>} />
        <Route path='/login' element={<Login />} />

      </Routes>
      <ToastContainer theme='dark' />

    </div>

  )
}

export default App
