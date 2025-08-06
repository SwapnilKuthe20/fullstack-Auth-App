import { Navigate, Route, Routes } from 'react-router-dom'
import './App.css'
import Login from './Components/Login'
import Home from './Components/Home'
import Signup from './Components/Signup'
import Products from './Components/Products'
import { ToastContainer } from 'react-toastify'

function App() {

  const route = [
    { id: 1, path: '/', element: <Navigate to='/login' /> },
    { id: 2, path: '/login', element: <Login /> },
    { id: 3, path: '/home', element: <Home /> },
    { id: 4, path: '/signup', element: <Signup /> },
    { id: 5, path: '/products', element: <Products /> },
  ]


  return (
    <div className='bg-black text-amber-100 flex justify-center items-center h-[100vh]'>
      <Routes>
        {
          route.map(({ id, path, element }) => (
            <Route key={id} path={path} element={element} />
          ))
        }

      </Routes>

      <ToastContainer theme='dark' />

    </div>
  )
}

export default App
