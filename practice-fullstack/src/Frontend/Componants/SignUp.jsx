import axios from 'axios';
import React, { useState } from 'react';
import { baseUrl } from './BaseUrl/BaseUrl';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const handleSignup = (e) => {
        e.preventDefault();

        axios.post(`${baseUrl}/api/auth/signup`, form)
            .then((res) => {
                // console.log(res);
                toast.success(res.data.message);

                setForm({
                    name: "",
                    email: "",
                    password: ""
                })

                navigate('/login')
            }).catch((err) => {
                toast.error(err.response.data.message);
            })
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>

            <form onSubmit={handleSignup}>
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Username"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                />
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                />
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Password"
                    type="password"
                    value={form.password}
                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                />

                <button className="bg-green-600 text-white px-4 py-2" type="submit">
                    Sign Up
                </button>
            </form>
        </div>
    );
}

export default SignUp;
