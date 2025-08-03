import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const Products = () => {
    const [products, setProducts] = useState([]);


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
