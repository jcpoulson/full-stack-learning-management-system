import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserSignOut = (props) => {

    props.signOut();
    Cookies.remove('authenticatedUser');
    
    return (
        <Redirect to="/" />
    )
}

export default UserSignOut;