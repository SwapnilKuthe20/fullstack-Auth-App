import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons';
import { faFacebookF, faInstagram, faWhatsapp, faTwitter } from '@fortawesome/free-brands-svg-icons';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';



const Login = () => {

    const [formData, setFormData] = useState({
        email: "",
        password: ""
    })
    // console.log(formData, "...formData");

    const navigate = useNavigate();

    const handleInput = (e) => {
        const { name, value } = e.target;

        setFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    //  For storing token into localStorage ::
    const handleLoginForm = async (e) => {
        e.preventDefault();

        try {
            const resp = await axios.post("http://localhost:5001/api/auth/login", formData)
            console.log(resp, "...Response")

            localStorage.setItem("access_token", resp.data.accessToken)
            localStorage.setItem("refresh_token", resp.data.refreshToken)

            setFormData({ email: "", password: "" })
            navigate('/dashboard')
        } catch (err) {
            alert(err.response.data.msg, "...Errro");
        }

    }

    return (
        <div className='flex justify-center items-center min-h-screen'>
            <div className='bg-amber-100 shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-md'>

                <h3 className='text-3xl text-center font-bold mb-6 '>
                    <span className='bg-gradient-to-r text-transparent from-blue-500 to-purple-500 bg-clip-text'>Log In</span>
                </h3>

                <form onSubmit={handleLoginForm}>
                    <label htmlFor="email" className='text-gray-700 text-sm font-bold mb-2 mr-2 '>
                        <FontAwesomeIcon icon={faEnvelope} className='mr-2' />
                        Email
                    </label>

                    <input
                        className='shadow block mb-4 mt-2 appearance-none bg-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="email"
                        id='email'
                        onChange={handleInput}
                        name="email"
                        value={formData.email}
                        placeholder='Enter Email id...'
                    />

                    <label htmlFor="password" className='text-gray-700 text-sm font-bold mr-2 mb-2 '>
                        <FontAwesomeIcon icon={faEnvelope} className='mr-2' />
                        password
                    </label>

                    <input
                        className='shadow block mb-4 mt-2 appearance-none bg-white rounded w-full py-2 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                        type="password"
                        id='password'
                        onChange={handleInput}
                        name="password"
                        value={formData.password}
                        placeholder='Enter Password...'
                    />

                    <button
                        type='submit'
                        className='bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-700 hover:to-purple-700 text-white focus:outline-none focus:shadow-outline w-full py-3 rounded-2xl font-bold'>
                        LogIn
                    </button>

                    <div className='text-center my-4'>
                        <Link href='/' className='text-gray-700 hover:underline'> Forget Password ? </Link>
                    </div>
                </form>

                <p className='text-gray-600 my-4 text-center'>
                    don't have an account ?
                    <Link to='/signup' className='text-blue-800 hover:underline'> Sign up</Link>
                </p>
                <div>
                    <p className='text-gray-600 text-center'> or login with : </p>

                    <div className='py-4 flex items-center justify-center '>
                        <Link to="./" className='bg-blue-500 hover:bg-blue-700 py-2 px-3 rounded  mr-2'>
                            <FontAwesomeIcon icon={faFacebookF} className='text-white text-xl w-4' />
                        </Link>

                        <Link to="./" className='bg-pink-500 hover:bg-pink-700 py-2 px-3 rounded  mr-2'>
                            <FontAwesomeIcon icon={faInstagram} className='text-white text-xl w-4' />
                        </Link>

                        <Link to="./" className='bg-green-500 hover:bg-green-700 py-2 px-3 rounded  mr-2'>
                            <FontAwesomeIcon icon={faWhatsapp} className='text-white text-xl w-4' />
                        </Link>

                        <Link to="./" className='bg-blue-500 hover:bg-blue-700 py-2 px-3 rounded  '>
                            <FontAwesomeIcon icon={faTwitter} className='text-white text-xl w-4' />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
