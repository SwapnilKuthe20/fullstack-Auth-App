import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Componants/Login'
import SignUp from './Componants/SignUp'
import Home from './Componants/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Routes>
        <Route path='/' element={<Navigate to={'/login'} />} />
        <Route path='/home' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<SignUp />} />
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
