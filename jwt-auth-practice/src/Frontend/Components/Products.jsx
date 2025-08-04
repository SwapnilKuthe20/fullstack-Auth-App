import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { baseURL } from './BaseUrl/baseURL';
import { toast } from 'react-toastify';


const Products = () => {
    const [products, setProducts] = useState([]);

    const token = localStorage.getItem('accessToken')

    useEffect(() => {
        axios.get(`${baseURL}/products`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }).then((res) => {
            console.log(res, "...res");

        }).catch((err) => {
            console.log(err, "...errorr");
            // toast.error()
        })
    }, [])

    const handleCart = () => {

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

                <Link to={'./cart'}>
                    <button onClick={handleCart}>Go to Cart</button>
                </Link>
            </div >
        </>
    );
}

export default Products;
