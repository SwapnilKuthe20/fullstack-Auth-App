import { Link } from 'react-router-dom';

const Home = () => {

    const handleLogout = () => {
    
    }

    return (
        <div className=''>
            <h3 className='mb-6 text-3xl'>Home Component</h3>

            <ul className='bg-blue-950 p-3 rounded-2xl'>
                <li className='mt-4 text-amber-300'>
                    <Link to={'/login'}> Login </Link>
                </li>

                <li className='mt-4 text-cyan-300'>
                    <Link to={'/signup'}> Signup </Link>
                </li>

                <li className='my-4 text-fuchsia-600'>
                    <Link to={'/products'}> Products </Link>
                </li>
            </ul>

            <button onClick={handleLogout} className='bg-teal-700 py-2.5 px-7 mt-6 block m-auto rounded-full cursor-pointer'> Logout </button>

        </div>
    );
}

export default Home;
