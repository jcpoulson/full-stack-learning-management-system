import React from 'react';
import forbidden from '../img/forbidden.png';

const Forbidden = () => {
    return (
        <div className="not-found">
            <strong><h1 className="not-found-text">Sorry, you do not have access to the requested resource</h1></strong>
            <img src={forbidden} alt="access denied, you do not have permission to access this resource" />
        </div>
    )
}

export default Forbidden;