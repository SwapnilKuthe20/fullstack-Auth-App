import { Link } from 'react-router-dom';

const Home = () => {


    return (
        <>
            <h3> Home Component </h3>

            <Link to={'/products'}>
                <button  className='bg-black text-cyan-100 p-2 m-1 cursor-pointer'> Products </button>
            </Link>
        </>
    );
}

export default Home;
