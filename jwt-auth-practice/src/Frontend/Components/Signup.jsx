import { useState } from "react";
import axios from 'axios';
import { baseURL } from "./BaseUrl/baseURL";
import { toast } from "react-toastify";
import { useNavigate } from "react-router";

const Signup = () => {

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    let payload = {
        userName: form.username,
        email: form.email,
        password: form.password
    }

    const handleSignup = (e) => {
        e.preventDefault();

        axios.post(`${baseURL}/api/auth/signup`, payload)
            .then((res) => {
                // console.log(res, "...res");
                toast.success(res.data.message)

                navigate('/login')

                setForm({
                    username: "",
                    email: "",
                    password: ""
                })

            }).catch((err) => {
                console.log(err, "...err");
                toast.error(err.response.data.message)
            })
    }

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>

            <form onSubmit={handleSignup}>
                <input
                    className="border p-2 w-full mb-2"
                    placeholder="Username"
                    value={form.username}
                    onChange={(e) => setForm({ ...form, username: e.target.value })}
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
export default Signup;

