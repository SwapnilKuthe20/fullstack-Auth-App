import './App.css'
import { Navigate, Route, Routes } from 'react-router-dom'
import Login from './Components/Login'
import Signup from './Components/Signup'
import Home from './Components/Home'
import Products from './Components/Products'
import { ToastContainer } from 'react-toastify'
import Dashboard from './Components/Dashboard'
import WishList from './Components/WishList'
import Cart from './Components/Cart'
import ProtectedRoutes from './Components/ProtectedRoutes/ProtectedRoutes'

function App() {

  const routes = [
    { id: 1, path: "/", element: <Navigate to={'/login'} /> },
    { id: 2, path: "/login", element: <Login /> },
    { id: 3, path: "/signup", element: <Signup /> },
    { id: 4, path: "/home", element: <Home /> },
    { id: 5, path: "/products", element: <ProtectedRoutes><Products /></ProtectedRoutes> },
    { id: 6, path: "/dashboard", element: <ProtectedRoutes><Dashboard /></ProtectedRoutes> },
    { id: 7, path: "/wishlist", element: <ProtectedRoutes> <WishList /></ProtectedRoutes> },
    { id: 8, path: "/cart", element: <ProtectedRoutes><Cart /></ProtectedRoutes> },
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
