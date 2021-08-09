import React from 'react';
import notFound from '../img/not-found.png';

const NotFound = () => {
    return (
        <div className="not-found">
            <img className="not-found-img" src={notFound} alt="resource not found" />
        </div>
    )
}

export default NotFound;