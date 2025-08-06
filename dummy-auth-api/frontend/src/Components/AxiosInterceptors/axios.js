import axios from "axios";
import { BaseURL } from "../BaseUrl/BaseURL";


const app = axios.create({
    baseURL: `${BaseURL}`,
    withCredentials: false
})


app.interceptors.request.use(
    (config) => {
        console.log(config, "...inter req cof");

        const token = localStorage.getItem("accessToken")
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    (error) => {
        console.log(error, "...inter req err");
        return Promise.reject(error)
    }
)

app.interceptors.response.use(
    (response) => {
        console.log(response, "...inter res res");
        return response
    },

    async (error) => {
        console.log(error, "...inter res err");


        const originalConfig = error.config;
        // console.log(originalConfig, "...originalConfig");                                                                                


        if (error.response?.status == 401 && !originalConfig._retry) {
            originalConfig._retry = true;

            try {
                const res = await app.post('/api/auth/refreshToken', {}, {
                    withCredentials: true
                })

                const newToken = res.data.accessToken;
                localStorage.setItem('accessToken', newToken);

                // Set new token for original request
                originalConfig.headers.Authorization = `Bearer ${newToken}`


                // Retry the original request
                return app(originalConfig)

            } catch (err) {
                console.log("Refresh failed !!", err);
                return Promise.reject(err)
            }
        }
        return Promise.reject(error)
    }
)

export default app;