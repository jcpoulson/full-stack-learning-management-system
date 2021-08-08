import React from 'react';
<<<<<<< HEAD
import { Redirect } from 'react-router-dom';
=======
import { useHistory, Redirect } from 'react-router-dom';
>>>>>>> 6af826abfc8695dcc13a6f6e7e7c5042ce1d4a70
import Cookies from 'js-cookie';

const UserSignOut = (props) => {

<<<<<<< HEAD
    props.signOut();
    Cookies.remove('authenticatedUser');
    Cookies.remove('statePassword');
    
    return (
        <Redirect to="/" />
    )
=======
    return(
        <Redirect to="/" />
    );

    // props.setUser({});
    // Cookies.remove('authenticatedUser');
    // history.push('/')
>>>>>>> 6af826abfc8695dcc13a6f6e7e7c5042ce1d4a70
}

export default UserSignOut;