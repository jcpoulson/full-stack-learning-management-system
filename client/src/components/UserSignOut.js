import React from 'react';
import { useHistory, Redirect } from 'react-router-dom';
import Cookies from 'js-cookie';

const UserSignOut = (props) => {
    const history = useHistory();

    return(
        <Redirect to="/" />
    );

    // props.setUser({});
    // Cookies.remove('authenticatedUser');
    // history.push('/')
}

export default UserSignOut;