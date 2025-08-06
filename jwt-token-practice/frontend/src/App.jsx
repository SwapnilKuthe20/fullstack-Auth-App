import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import Products from './Components/Products'
import { ToastContainer } from 'react-toastify'

function App() {

  const routes = [
    { id: 1, path: "/", element: <Navigate to={'/login'} /> },
    { id: 2, path: "/login", element: <Login /> },
    { id: 3, path: "/signup", element: <Signup /> },
    { id: 4, path: "/home", element: <Home /> },
    { id: 5, path: "/products", element: <Products /> },
  ]

  return (
    <div className='bg-black text-amber-50 flex justify-center items-center h-[100vh]'>
      <Routes>
        {
          routes.map(({ id, path, element }) => (
            <Route key={id} path={path} element={element} />
          ))
        }
      </Routes>

      <ToastContainer theme='dark' />

    </div>
  )
}

export default App
