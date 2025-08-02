import React from 'react';
import { useNavigate } from 'react-router-dom';


const Home = () => {

    const navigate = useNavigate()

    const handleLogIn = () => {
        navigate('/login')
    }

    const handleSignUp = () => {
        navigate('/signup')
    }

    return (
        <div>
            <h3> Home Component</h3>

            <button onClick={handleLogIn} className='bg-amber-500 p-2.5 rounded text-amber-100 m-2.5 cursor-pointer'> Login </button>
            <button onClick={handleSignUp} className='bg-amber-500 p-2.5 rounded text-amber-100 m-2.5 cursor-pointer'> Signup </button>
        </div >
    );
}

export default Home;
