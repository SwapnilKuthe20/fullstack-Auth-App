import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Dashboard() {
    const [token, setToken] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const t = localStorage.getItem("token");
        if (!t) {
            navigate("/login");
        } else {
            setToken(t);
        }
    }, [navigate]);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    };

    return (
        <div className="p-6">
            <h2 className="text-2xl font-bold">Welcome to the Dashboard</h2>
            <p>Your token: {token}</p>
            <button className="mt-4 bg-red-500 text-white px-4 py-2" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}
