import axios from "axios";
import { useState } from "react";
import { BaseURL } from "./BaseUrl/BaseURL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import app from "./AxiosInterceptors/axios";

const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })

    // console.log(formData, "...formData");

    const navigate = useNavigate()

    const handleInput = (e) => {
        const { name, value } = e.target;

        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }))
    }

    // With Interceptor ::
    const handleSubmit = (e) => {
        e.preventDefault();
        app.post('/api/auth/login', formData, {
            withCredentials: true
        })
            .then((res) => {
                toast.success(res.data.message)

                localStorage.setItem("accessToken", res.data.accessToken)

                navigate('/home')

                setFormData({
                    email: "",
                    password: "",
                })
            }).catch((err) => {
                toast(err.response.data.message)
            })
    }

    // Withoit Axios Interceptors ::

    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     axios.post(`${BaseURL}/api/auth/login`, formData, {
    //         withCredentials: true
    //     })
    //         .then((res) => {
    //             // console.log(res, "...res");
    //             toast(res.data.message)

    //             localStorage.setItem("accessToken", res.data.accessToken)

    //             navigate('/home')

    //             setFormData({
    //                 email: "",
    //                 password: ""
    //             })

    //         }).catch((err) => {
    //             console.log(err);
    //             toast.error(err.response.data.message)
    //         })
    // }

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
