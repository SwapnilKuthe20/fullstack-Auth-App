import { Link } from 'react-router-dom';

const Home = () => {


    return (
        <div className='w-full h-[100vh] flex justify-center items-center flex-col' >
            <h3 className='m-2.5'> Home Component </h3>

            <Link to={'/products'}>
                <button className='bg-amber-800 text-white p-2 m-1 cursor-pointer rounded'> Products </button>
            </Link>
        </div>
    );
}

export default Home;
