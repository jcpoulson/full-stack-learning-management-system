import React from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';

const UserSignOut = (props) => {
    const history = useHistory();

    console.log("this should print to the console, to test that the component call works")

    // props.setUser({});
    // Cookies.remove('authenticatedUser');
    // history.push('/')
}

export default UserSignOut;