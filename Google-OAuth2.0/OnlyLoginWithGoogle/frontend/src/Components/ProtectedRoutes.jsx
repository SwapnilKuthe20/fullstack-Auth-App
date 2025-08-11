import { Navigate } from 'react-router-dom';

const ProtectedRoutes = ({ children }) => {

    const token = localStorage.getItem("accessToken")

    if (token) {
        return children;
    } else {
        return <Navigate to={'/login'} replace />
    }
}

export default ProtectedRoutes;
