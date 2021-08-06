import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const UserSignIn = (props) => {
    const [userEmail, setUserEmail] = useState('');
    const [userPassword, setUserPassword] = useState('');
    const history = useHistory();

    const change = (event) => {
        if (event.target.id === "emailAddress") {
            setUserEmail(event.target.value);
        } else if (event.target.id === "password") {
            setUserPassword(event.target.value);
        }
    }

    const submit = () => {
        props.signIn(userEmail, userPassword);
        history.goBack();
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign In</h2>
                
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