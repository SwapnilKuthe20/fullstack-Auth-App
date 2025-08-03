import axios from "axios";
import { baseUrl } from "../BaseUrl/BaseUrl";
import api from "../../../../../expense-tracker-mern/src/frontend/Api/axios";

// axios instance create 
const API = axios.create({
    baseURL: baseUrl,
    withCredentials: false       // cookie sirf refreshPost m jana chiye
})

API.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('accessToken');  // fresh token ayegi
        // console.log(token, "...token axios");

        if (token) {
            config.headers['Authorization'] = `bearer ${token}`
        }

        return config
    },

    (error) => Promise.reject(error)
)

API.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalConfig = error.config;
        // console.log(originalConfig, "...originalConfig");

        if (error.response.status === 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {

                const res = await API.post('/api/auth/refreshToken', {}, {
                    withCredentials: true
                })

                const newAccessToken = res.data.access_token;

                localStorage.setItem('accessToken', newAccessToken)

                originalConfig.headers['Authorization'] = `Bearer ${newAccessToken}`

                return API(originalConfig)

            } catch (error) {
                console.log("Refresh token failed:", error.message);
            }
        }
        return Promise.reject(error)
    }

)
export default API;
