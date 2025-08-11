import { GoogleLogin } from '@react-oauth/google'
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const navigate = useNavigate()

    useEffect(() => {

        const token = localStorage.getItem("accessToken")
        if (token) {
            navigate('/home')
        }

    }, [])

    const handleGoogleSuccess = async (credentialResponse) => {
        try {

            const res = await axios.post('http://localhost:4000/api/auth/google/callback', {
                credential: credentialResponse.credential
            }, {
                withCredentials: true
            })
            // console.log(res, "...res");
            localStorage.setItem("accessToken", res.data.accessToken)
            navigate('/home')
            toast.success(res.data.message)

        } catch (error) {
            console.log("Login Error....", error);
            toast.error(error.message)
        }
    }

    const handleGoogleError = () => {
        toast.error("Login Error with google ??")
    }

    return (
        <div>
            <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={handleGoogleError}
            />
        </div>
    );
}

export default Login;
