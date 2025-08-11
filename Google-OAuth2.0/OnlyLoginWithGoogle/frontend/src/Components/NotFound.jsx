import React from 'react';
import { NavLink } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className='bg-amber-900 text-amber-200 w-96 m-auto text-center p-5'>
            <h2 className='mb-6'> Page Not Foound !! </h2>

            <NavLink to={'/login'} > go to Login </NavLink>
        </div>
    );
}

export default NotFound;
