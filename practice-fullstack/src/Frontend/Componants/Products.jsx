import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import API from './Api/axios';


const Products = () => {
    const [products, setProducts] = useState([]);

    const navigate = useNavigate()

    useEffect(() => {
        API.get(`/api/products`)
            .then((res) => {
                // console.log(res, "res products.....");
                toast.success("Products api success")

                setProducts(res.data)
            }).catch((err) => {
                console.log(err, "erroe...");
                toast.error(err.response.data.message)
            })
    }, [])

    const handleCart = () => {

    }

    const handleLogout = () => {
        API.post('/api/auth/logout', {}, {
            withCredentials: true
        })
            .then((res) => {
                localStorage.removeItem('accessToken');
                navigate('/home')
                toast.success(res.data.message)

            }).catch((err) => {
                // console.log(err, "error logout !");
                toast.error(err.code || "Logout Failed !!")
            })
    }

    return (
        <>
            <div className='w-full flex items-center justify-center '>
                {
                    products.map((items, ind) => {
                        const { Price, product } = items
                        return (
                            < div key={ind} className='bg-amber-600 text-amber-50 p-2.5 m-2.5 cursor-pointer' >
                                <h3> {product}</h3>
                                <p>{Price}</p>
                            </div>
                        )
                    })
                }
            </div >

            <Link to={'./cart'}>
                <button onClick={handleCart} className='text-amber-100 block m-auto'>Go to Cart</button>
            </Link>

            <button
                onClick={handleLogout}
                className='text-amber-100 block m-auto border-amber-600 p-2.5 bg-amber-500 rounded cursor-pointer'>
                Logout
            </button>
        </>
    );
}

export default Products;
