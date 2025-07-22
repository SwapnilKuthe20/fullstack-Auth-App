// import React, { useState } from "react";
// import axios from "axios";

// function TestAccess() {
//   const [message, setMessage] = useState("");

//   const handleLogin = async () => {
//     const res = await axios.post("http://localhost:5001/api/login", { email: "test@example.com" });
//     localStorage.setItem("accessToken", res.data.accessToken);
//     alert("✅ Logged in! Token saved. Wait 10 seconds...");
//   };

//   const accessProtected = async () => {
//     const token = localStorage.getItem("accessToken");
//     try {
//       const res = await axios.get("http://localhost:5001/api/protected", {
//         headers: { Authorization: `Bearer ${token}` },
//       });
//       setMessage(res.data.msg);
//     } catch (err) {
//       console.log(err.response.data);
//       if (err.response.status === 401) {
//         setMessage("❌ Token expired or invalid. Auto logout...");
//         localStorage.removeItem("accessToken");
//       }
//     }
//   };

//   return (
//     <div style={{ padding: 20 }}>
//       <button onClick={handleLogin}>Login</button>
//       <button onClick={accessProtected}>Access Protected</button>
//       <p>{message}</p>
//     </div>
//   );
// }

// export default TestAccess;
