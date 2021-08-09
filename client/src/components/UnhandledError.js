import React from 'react';
import error from '../img/error.jpg'

const UnhandledError = () => {
    return (
        <div className="not-found">
            <img src={error} alt="internal server error" />
        </div>
    )
}

export default UnhandledError;