import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Login = () => {

    const navigate = useNavigate()

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            const res = await axios.post('http://localhost:3210/api/auth/google/callback', {
                credential: credentialResponse.credential
            }, {
                withCredentials: true
            })
            localStorage.setItem("accessToken", res.data.accessToken)
            toast.success(res.data.message)
            navigate('/home')
        } catch (err) {
            console.log("Login Error", err);
            toast.error(err.response.data.message)
        }
    }

    const handleGoogleError = () => {

    }

    return (
        <div className='bg-amber-900 rounded-2xl'>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
            />
        </div>
    );
}

export default Login;
