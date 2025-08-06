import axios from "axios";
import { useState } from "react";
import { BaseURL } from "./BaseUrl/BaseURL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import app from "./AxiosInterceptors/axios";

const Signup = () => {
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
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

    const payload = {
        userName: formData.username,
        email: formData.email,
        password: formData.password
    }

    //  With Interceptors :::
    const handleSubmit = (e) => {
        e.preventDefault();
        app.post('/api/auth/signup', payload)
            .then((res) => {
                toast.success(res.data.message)

                navigate('/login')

                setFormData({
                    username: "",
                    email: "",
                    password: "",
                })
            }).catch((err) => {
                toast(err.response.data.message)
            })
    }


    // Without Axios Interceptors ::
    // const handleSubmit = (e) => {
    //     e.preventDefault();

    //     axios.post(`${BaseURL}/api/auth/signup`, payload)
    //         .then((res) => {
    //             // console.log(res, "...resp");
    //             toast.success(res.data.message)

    //             navigate('/login')

    //             setFormData({
    //                 username: "",
    //                 email: "",
    //                 password: "",
    //             })

    //         }).catch((err) => {
    //             // console.log(err);
    //             toast(err.response.data.message)
    //         })
    // }

    return (
        <div className="w-xl bg-fuchsia-950 text-white p-4 rounded-2xl">
            <h3 className="text-center text-4xl m-3"> Signup Form </h3>
            <form onSubmit={handleSubmit}>

                <label htmlFor="name" className="ms-2 cursor-pointer">UserName </label>
                <div className="p-2 mx-4 my-5  rounded-2xl border border-amber-300">
                    <input type="text" id="name" onChange={handleInput} name="username" value={formData.username} placeholder='Enter Username...' className="w-full outline-none p-1 " />
                </div>

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

export default Signup;
