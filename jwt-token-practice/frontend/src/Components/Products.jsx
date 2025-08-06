import { useEffect, useState } from "react";
import API from "./axiosInterceptor/axios";
import { toast } from "react-toastify";


const Products = () => {

    const [products, setProducts] = useState([]);

    useEffect(() => {

        API.get('/api/products', {
            withCredentials: true
        })
            .then((res) => {
                // console.log("res products...", res);
                toast.success(res.status, "...Get products success")

                setProducts(res.data)
            })
            .catch((err) => {
                console.log(err, "...products error");
                toast.error("Error get Products")
            })
    }, [])

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
