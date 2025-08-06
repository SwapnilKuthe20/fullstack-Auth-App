import axios from "axios";
import { BaseURL } from "../Constants/BaseUrl";

const API = axios.create({
    baseURL: `${BaseURL}`,
    withCredentials: false
})

API.interceptors.request.use(
    (config) => {

        const token = localStorage.getItem("accessToken")

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        return Promise.reject(error)
    }
)

API.interceptors.response.use(
    (response) => response,

    async (error) => {
        // console.log(error, "...axios intr resp refresh error");

        const originalConfig = error.config;
        // console.log(originalConfig, "...originalConfig");

        if (error.response.status === 401 && !originalConfig._retry) {
            try {

                originalConfig._retry = true;

                const res = await API.post('api/auth/generateToken', {}, {
                    withCredentials: true
                })

                console.log(res, "...res generateToken");

                const newToken = res.data.accessToken

                localStorage.setItem("accessToken", newToken)

                originalConfig.headers.Authorization = `Bearer ${newToken}`;

                return API(originalConfig)   // ✅ RETRY & RETURN

            }
            catch (err) {
                console.log("Generate Token Failed ??", err);
                return Promise.reject(error)        // ✅ propagate the refresh failure
            }
        }
        return Promise.reject(error)
    }
)

export default API
