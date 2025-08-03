import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Frontend/Components/Login'
import Signup from './Frontend/Components/Signup'
import Home from './Frontend/Components/Home'
import Products from './Frontend/Components/Products'
import { ToastContainer, toast } from 'react-toastify';

function App() {

  return (
    <div className='bg-black text-amber-100 h-[100vh]'>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/products' element={<Products />} />
      </Routes>

      <ToastContainer />
    </div>
  )
}

export default App
