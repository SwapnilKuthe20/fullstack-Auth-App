import React, { useEffect, useState } from 'react';
import API from './axiosInterceptor/axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    // console.log(formData, "...formData");

    const navigate = useNavigate()

    useEffect(() => {
        const token = localStorage.getItem('accessToken')

        if (token) {
            navigate('/home', { replace: true })
        }

        //         🧠 replace: true ka kaam kya hai ?
        //     replace : false(default ): Browser history me naya entry add hota hai
        // replace: true: Current entry replace ho jaata hai(back button se pichla page nahi aata)

    }, [])

    const handleInput = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }


    const handleSubmit = (e) => {
        e.preventDefault()

        API.post('/api/auth/login', formData, {
            withCredentials: true
        })
            .then((res) => {
                // console.log(res, "...signup res");
                toast.success(res.data.message)

                localStorage.setItem("accessToken", res.data.accessToken)

                navigate('/home', { replace: true })

                setFormData({
                    email: "",
                    password: ""
                })
            })
            .catch((err) => {
                // console.log(err, "...errr signup");
                toast.error(err.response.data.message)
            })
    }

    return (
        <div className="w-xl bg-emerald-950 text-white p-4 rounded-2xl">
            <h3 className="text-center text-4xl m-3"> Login Form </h3>
            <form onSubmit={handleSubmit}>

                <label htmlFor="email" className="ms-2 cursor-pointer">Email </label>
                <div className="p-2 mx-4 my-5  rounded-2xl border border-amber-300">
                    <input type="email" id="email" onChange={handleInput} name="email" value={formData.email} placeholder='Enter Email...' className="w-full outline-none p-1 " />
                </div>

                <label htmlFor="pass" className="ms-2 cursor-pointer"> Password </label>
                <div className="p-2 mx-4 my-5 rounded-2xl border border-amber-300">
                    <input type="text" id="pass" onChange={handleInput} name="password" value={formData.password} placeholder='Enter password..' className="w-full outline-none p-1" />
                </div>

                <button type="submit" className="w-1/2 bg-amber-400 m-auto block py-2 rounded-full cursor-pointer"> Submit </button>
            </form>
        </div>
    );
}

export default Login;
