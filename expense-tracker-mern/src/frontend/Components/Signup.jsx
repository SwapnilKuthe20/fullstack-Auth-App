import axios from "axios";
import { useState } from "react";
import { BaseUrl } from "../BaseUrl/BaseUrl";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Signup = () => {

    const navigate = useNavigate()

    const [form, setForm] = useState({
        username: "",
        email: "",
        password: ""
    })

    let payload = {
        name: form.username,
        email: form.email,
        password: form.password
    }

    const handleSignup = (e) => {
        e.preventDefault();

        axios.post(`${BaseUrl}/auth/signup`, payload)
            .then((res) => {
                console.log(res, "res");
                toast.success("User Signup Successfullt !!")

                navigate('/login');

                setForm({
                    username: "",
                    email: "",
                    password: ""
                })

            }).catch((err) => {
                console.log(err, "Error Ocuured");
                toast.error(err.response.data.message.message)
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

