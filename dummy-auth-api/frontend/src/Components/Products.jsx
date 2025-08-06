import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { BaseURL } from './BaseUrl/BaseURL';
import { toast } from 'react-toastify';
import app from './AxiosInterceptors/axios';

const Products = () => {

    const [products, setProducts] = useState([])

    console.log(products, "...products");

    // With Interceptor ::
    useEffect(() => {
        app.get('/api/products')
            .then((res) => {
                console.log(res, "...res");
                toast.success("Products fetch successfully !!")
                setProducts(res.data)
            }).catch(err => {
                console.log(err, "..err");
                toast.error(err.response.data.message)
            })
    }, [])


    // without Axios Inceptors ::
    // const fetchProduct = (accessToken) => {
    //     axios.get(`${BaseURL}/api/products`, {
    //         headers: {
    //             Authorization: `Bearer ${accessToken}`
    //         }
    //     }).then((res) => {
    //         console.log(res, "...res");
    //         toast.success("Products fetch successfully !!")
    //         setProducts(res.data)

    //     }).catch((err) => {
    //         console.log(err, "err");

    //         toast.error(err.response.data.message)

    //         if (err.response.status === 401) {

    //             axios.post(`${BaseURL}/api/auth/refreshToken`, {}, {
    //                 withCredentials: true
    //             }).then((res) => {
    //                 console.log(res, "...res refresh");

    //                 const newToken = res.data.accessToken;

    //                 fetchProduct(newToken)

    //             }).catch((err) => {
    //                 console.log(err, "...err refresh");

    //             })
    //         }
    //     })
    // }

    // useEffect(() => {
    //     const token = localStorage.getItem("accessToken")
    //     if (token) {
    //         fetchProduct(token)
    //     }

    // }, [])

    return (
        <div className='flex justify-center items-center flex-wrap'>
            {
                products.map(({ productName, price, brand }, ind) => (
                    <div key={ind} className=' bg-amber-600 w-3xs text-amber-50 flex justify-center items-center p-3 m-2.5 '>
                        <div >
                            <h1 className='text-center text-2xl'>Products</h1>
                            <h1>{productName}</h1>
                            <h2>{price}</h2>
                            <h2>{brand}</h2>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Products;
