import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const UserSignIn = (props) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const history = useHistory();

    // Method for state change
    const change = (event) => {
        if (event.target.id === "emailAddress") {
            setUserEmail(event.target.value);
        } else if (event.target.id === "password") {
            setUserPassword(event.target.value);
        }
    }

/* 
    This method on submit uses the signIn method from App.js to put user data within application state
*/
    const submit = () => {
        props.signIn(userEmail, userPassword);
        
        // This redirects the user to the previous screen if they tried to access a resource while not signed in
        if (props.validationHistory) {
            setTimeout(() => history.push(props.validationHistory), 1000);
            props.setValidationHistory('');
        } else {
            history.push('/');
        }
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                {console.log(props)}
                <div className="signin-form">
                    <label for="emailAddress">Email Address</label>
                    <input id="emailAddress" name="emailAddress" type="email" onChange={change}/>
                    <label for="password">Password</label>
                    <input id="password" name="password" type="password" onChange={change}/>
                    <button className="button" onClick={submit}>Sign In</button><NavLink to="/"><button className="button button-secondary">Cancel</button></NavLink>
                </div>
                <p>Don't have a user account? Click here to <NavLink to="/signup"><a>sign up</a></NavLink>!</p>
                
            </div>
        </main>
    )
}

export default UserSignIn;