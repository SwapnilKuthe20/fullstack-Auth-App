import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
    const [form, setForm] = useState({ username: "", email: "", password: "" });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSignup = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const res = await axios.post("https://api.realworld.io/api/users", {
                user: form,
            });

            const token = res.data.user.token;
            localStorage.setItem("token", token);
            navigate("/dashboard");
        } catch (err) {
            setError("Signup failed");
        }
    };

    return (
        <div className="p-6 max-w-md mx-auto">
            <h2 className="text-xl font-bold mb-4">Sign Up</h2>
            {error && <p className="text-red-500">{error}</p>}
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

