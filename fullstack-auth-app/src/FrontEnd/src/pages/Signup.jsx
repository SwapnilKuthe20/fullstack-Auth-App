// frontend/src/pages/Signup.jsx
import { useState } from "react";
import { signup } from "../api/auth";

import { signupUser } from '../api/auth'



function Signup() {
    const [formData, setFormData] = useState({ name: "", email: "", password: "" });
    const [message, setMessage] = useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const res = await signup(formData);
    //     setMessage(res.data.msg);
    // };



    const handleSignup = async () => {
        try {
            const res = await signupUser({
                name,
                email,
                password,
            })
            console.log(res.data.message)
        } catch (err) {
            console.error("Signup failed", err.response?.data?.message)
        }
    }


    return (
        <form onSubmit={handleSignup}>
            <input name="name" placeholder="Name" onChange={handleChange} />
            <input name="email" placeholder="Email" onChange={handleChange} />
            <input name="password" placeholder="Password" type="password" onChange={handleChange} />
            <button type="submit">Signup</button>
            {message && <p>{message}</p>}
        </form>
    );
}
export default Signup;