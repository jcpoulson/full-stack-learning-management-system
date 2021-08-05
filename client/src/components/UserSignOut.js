import React from 'react';
import { Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserSignOut = (props) => {

    props.signOut();
    Cookies.remove('authenticatedUser');
    Cookies.remove('statePassword');
    
    return (
        <Redirect to="/" />
    )
}

export default UserSignOut;