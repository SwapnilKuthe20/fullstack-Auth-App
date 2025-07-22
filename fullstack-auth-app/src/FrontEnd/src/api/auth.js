import axios from "axios";

const API = axios.create({
    baseURL: "http://localhost:5000/api",
    withCredentials: true, // for sending cookies (refresh token)
});

export const signupUser = (formData) => API.post("/auth/signup", formData);
