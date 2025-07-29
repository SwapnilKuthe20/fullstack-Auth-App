import './App.css'
import Cart from './Components/Cart'
import Home from './Components/Home'
import Login from './Components/Login'
import Products from './Components/Products'
import Signup from './Components/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to='/login' />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/products' element={<Products />} />
        <Route path='/products/cart' element={<Cart />} />
      </Routes>

      <ToastContainer
        position="top-right"  // ⬅ where the toast will appear
        autoClose={3000}      // ⬅ close after 3 seconds
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"         // or "dark" / "colored"
      />
    </>
  )
}

export default App
