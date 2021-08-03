import React from 'react';
import { useHistory } from 'react-router';
import Cookies from 'js-cookie';

const UserSignOut = (props) => {
    const history = useHistory();

    props.setUser({});
    Cookies.remove('authenticatedUser');
    history.push('/')
}

export default UserSignOut;