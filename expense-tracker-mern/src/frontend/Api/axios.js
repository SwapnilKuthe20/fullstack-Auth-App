import axios from "axios";
import { BaseUrl } from "../BaseUrl/BaseUrl";
// import { logoutUser } from "../utils/auth";

// Create custom axios instance
// Ye ek custom Axios client banata hai jisme predefined config hoti hai
// (jaise baseURL, headers, withCredentials, interceptors, etc.).
// Advantage--> Common config bar-bar likhne ki zarurat nahi
// Maintain karna mushkil ho jayega jab project bada hoga:
// Token update ka logic har component me hoga = duplicacy

const api = axios.create({
    baseURL: BaseUrl,           // Sabhi requests automatically is URL se start hongi.
    withCredentials: false,     // hr api m cookie send krni nhi hoti.. hm refresh m krenge send
});


// ✅ Request Interceptor: Attach access token automatically
// ➡️ Purpose: Token manually add karne ki zarurat nahi. Automatically har request mein attach ho jata hai.
// Ye kya karta hai ?
// Yeh Axios ka Request Interceptor hai — iska kaam har outgoing HTTP request me automatically Authorization token attach karna hai.
//  Syntax ::
//          axios.interceptors.request.use(successCallback, errorCallback)
// successCallback: function jo Har request se pehle chalta hai —  request ko modify karne ke liye
// errorCallback: agar koi error aaya request config banate waqt, to use handle karega.

// Isme successCallbackFn ka return value hota hai config — jo request bhejne se pehle Axios ko chahiye hota hai.

api.interceptors.request.use(               // Har request se pehle yeh function chalega.
    (config) => {
        const token = localStorage.getItem("accessToken");

        // Agar token hai, to request ke headers mein add kiya:
        // Authorization: Bearer < token >
        // Isse har request ke sath auth token backend ko milta hai.

        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`;    // always fresh
        }
        return config;
    },
    (error) => Promise.reject(error)        // 😎 Properly reject kar rahe hain
);

// 💡 Axios interceptors me kyun use hota hai?????
// Reason:
// Interceptor me agar koi error aata hai, to tum Axios ko explicitly Promise.reject(error) se batate ho:
// "Yeh error hai, tu isse aage mat le ja. User ke catch() me de de."
    
//      Promise.reject(error): Agar koi error hoti hai request config mein, to usko reject kar do.
//      ka use karke error ko aage propagate kar dete ho.

//     🔥 Agar tum Promise.reject() na karo to kya hoga?
//          Axios samjhega ki error handle ho gaya, aur wo request ko fir bhi aage bhej dega 
//          ya request silently fail ho sakti hai — tumhare catch block me error nahi aayega. ❌

// --------------------------------------------------------
// 🔄 Response Interceptor: Handle 401 & refresh access token
// 🔄 Response Interceptor: Token expire ho jaye to refresh karo
// Ye code basically Axios ka response interceptor hai jo automatically access token expire hone par 
// refresh token se naya token lene ki koshish karta hai.
//  Agar sab kuch sahi chale to request retry karta hai warna error return kar deta hai.

api.interceptors.response.use(
    // Agar request sahi hoti hai (200 OK), to seedha response return karo.
    (response) => response,         // zaruri hai — warna agla .then() nahi chalega

    // Agar request fail hoti hai (jaise 401 Unauthorized), 
    // to uska config (original request data) le lo, jise hum retry karenge.
    async (error) => {
        const originalRequest = error.config;

        // originalRequest me wo purani request hoti hai jisme error aaya. Isse retry karna ho to isi ka use hoga

          // ❌ Error response (e.g. 401, 403, 500)
          // Tum yahan error handling ya retry logic laga sakte ho

        // Agar status 401 hai (matlab token expire ho gaya ya invalid hai) 
        // aur ye request pehli baar fail hui hai (_retry flag false hai), tab:
        // _retry ko true set kar rahe hain taaki ek hi request bar - bar repeat na ho.

        if (error.response?.status === 401 && !originalRequest._retry) {
            // Check kar rahe ho ki kya error ka status 401 hai (Unauthorized) aur kya ye request already retry nahi hui hai
            //   (_retry flag se pata chalta hai).
            // JavaScript me undefined properties ko check karna allowed hai — error nahi deta.
            // !originalRequest._retry --> undefined hoga or error nhi dega 
            //  ⚠️ JavaScript undefined ko falsy maanta hai

        //  Yeh actually kaam kaise karta hai ??????
        // Pehle Axios ka error.config object aata hai
        // Usme _retry naam ki koi property nahi hoti (undefined hoti hai)
        // !undefined → true hota hai
        // Isliye condition pass ho jaata hai
        // Tum fir originalRequest._retry = true likh ke wo property bana lete ho

        originalRequest._retry = true;      //  // ✅ Ye line se _retry property create ho jaati hai
        
        //  ✅ originalRequest._retry = true likh ke hum ye ensure karte hain:
        // 👇 Ye request sirf ek hi baar retry ho, infinite baar nahi
        // Ab maan lo refresh bhi fail ho gaya, phir bhi tumne dubara refresh chalaya — to infinite loop ban sakta hai!

        // 🔍 2. Ye kis kaam aata hai ?????
        
        // 🧷 Loop se bachne ke liye:
        // Maan lo tumhara access token expire ho gaya.
        // Tum /dashboard pe ho.
        // API 401 de raha hai.
        // Tum refresh token bhejte ho aur dubara /dashboard call karte ho.
        // Ab maan lo refresh bhi fail ho gaya, phir bhi tumne dubara refresh chalaya — to infinite loop ban sakta hai!

            try {
                // /auth/refreshToken endpoint pe POST request bhejte hain taaki naya token mile.
                // api instance me globally withCredentials: false hai
                // Isliye refresh token request me hume Axios ka native instance use karke 
                // withCredentials: true manually pass karna padta hai — 
                // taaki browser server ko refresh token wali cookie bhej sake.

                const res = await api.post("/auth/refreshToken", {}, {
                    withCredentials: true,      // // allow sending cookies (for refresh token)
                });

                // Naya access_token milta hai response mein.
                const newAccessToken = res.data.access_token;

                // Save new access token
                localStorage.setItem("accessToken", newAccessToken);
                // 🔸 Naya access token mil gaya, use local storage me update kar diya taaki agli baar use ho sake.

                // Phir original request ko retry karte hain naye token ke sath.
                originalRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
                // Ab ye request 401 error nahi degi kyunki valid token hai.
                // 🔸 Ab jo purani request thi uske headers me naya access token daal diya gya hai.

                return api(originalRequest);    // // 🔁 retry original request
                // 🔸 Ab wahi purani request fir se fire karo, lekin naya token ke saath. Agar token valid hai to ye barabar chalegi.

            } catch (refreshError) {

                // Agar refresh bhi fail ho gaya (jaise refresh token bhi expire ho gaya), to logout ka logic likh sakte ho.
                console.log("Refresh token failed:", refreshError.message);
                // 🔸 Agar refresh token se bhi naya token nahi mila (ya kuch error aa gaya), to error ko reject kar do.

                //  isse user ko logout kar dena chahiye.
                //  Tum chaaho to yahan redirect to login bhi kar sakte ho.
                // logoutUser();
            }
        }
        //Agar 401 nahi hai, ya refresh fail ho gaya, to original error hi return karo.
        return Promise.reject(error);
    }
);

export default api;


// 🔁 Full Flow Summary (Hindi + English)
// Har API request se pehle, access token localStorage se uthakar headers mein daal diya jaata hai.

// Agar token valid hai, to response milta hai.

// Agar token expire ho gaya (401 mila), to:

// Refresh token se naya access token mangate hain.

// Naya token localStorage mein save karte hain.

// Phir original request ko dobara bhejte hain naye token ke sath.

// Agar refresh bhi fail ho jaye, to user ko logout karna chahiye.
// ------------------------------------------------------------------
 
//  1. Instance create karte waqt token q nhi dete ????

// ❌ Problem #1: Static token — change nahi hota
// Jab tu instance create karta hai aur localStorage.getItem("accessToken") call karta hai, us waqt ka token hi use hoga permanently.
// Agar baad me:
// user login kare
// logout kare
// ya token refresh ho jaye
// ...to Axios instance purane token ke sath hi request bhejta rahega. ❌

// 🔄 Interceptor ka fayda:
// interceptors.request.use() har request se pehle chalta hai, toh us waqt ka latest token use hota hai:

// Anonymous request ( public Api) = koi bhi request jisme user ki identity verify karne ka token nahi hota.
// Ye request login, register, ya public content jaise endpoints ke liye hoti hai.

// ❌ Problem #2: Token add karne ka logic conditional hota hai
// Maan le kuch requests anonymous bhi hain (like /login, /register):
// Agar tu headers.Authorization instance me default de diya, toh vo har request ke sath jayega — even un requests me jahan zarurat nahi hai.
// Interceptor ke andar tu condition laga sakta hai:

// ❌ Problem #3: Retry on token refresh (advanced use case)
// Refresh token logic me:
// Jab 401 aaye, tu token refresh karta hai
// Phir original request ko retry karta hai
// Interceptor ke bina tu dynamic way me token update nahi kar paata.
// Aur retry request me bhi updated token lagana hota hai — yeh sirf interceptor pattern me easy hota hai.

// -------------------------------------------------------------------------

// 🔍 Kya hai Promise.reject() ?????
// Promise.reject() ek utility method hai jo ek rejected promise return karta hai.
// Tum isse explicitly error create karke handle karwa sakte ho .catch() block me.

// 🔧 Syntax:
// Promise.reject(reason);
// reason: Jo error tum dena chahte ho (string, error object, kuch bhi)

// -----------------------------------------------------------------------------

// 🧠 Confusion: "try...catch kyun nahi likha?"  ??????

// 🔍 Reason #1: Axios khud internally try...catch use karta hai
// Tumhara interceptor ek callback function hai jo Axios khud call karta hai.
// To Axios tumhare interceptor ke andar agar koi error aaye to handle kar leta hai. 
// Isliye tumhe manually try/catch nahi lagana padta unless tum khud intentionally handle karna chaho.

// 🔍 Reason #2: Interceptor synchronous hota hai (mostly)
// Axios interceptor me tum usually synchronous code likhte ho:
// Yahan koi await nahi hai, isliye try...catch ki zarurat nahi padti unless tum intentionally kuch throw kar rahe ho.

// 🔚 Final Baat:
// Axios ke interceptor ka syntax thoda different hai kyunki Axios khud tumhara function callback ki tarah handle karta hai, 
// aur error ko bhi internally try...catch karta hai. Isliye tumhe manually try...catch lagane ki zarurat nahi hoti — 
// jab tak tum khud async/await use na karo. Tab Promise.reject() ya try/catch must hai.
// -----------------------------------------------------------------------------

// config object kahan se aata hai ??????

// 🧠 So Final Answer:
// "config success callback me kaise aaya?"
// 👉 Because Axios internally tumhara callback function call karta hai, 
// aur apne banaye hue request config object ko parameter ke form me usme bhejta hai.
// Tu us config ko modify kar sakta hai — jaise token add karna — aur usse return kar deta hai.
// -----------------------------------------------------------------------------
// Agar ye interceptor na hota to kya hota ?????
// User jab token expire hone ke baad koi request karta to usko 401 Unauthorized milta.
// Har bar manually login karna padta ya token renew karna padta.
// User experience poor hota — refresh token se auto-renew kaafi seamless feel deta hai.

