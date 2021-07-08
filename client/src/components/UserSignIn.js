import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import btoa from 'btoa';
import axios from 'axios';

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
        const encodedCredentials = btoa(`${userEmail}:${userPassword}`);
        
        let config = {
            method: 'get',
            url: 'http://localhost:5000/api/users',
            headers: { 
              'Authorization': `Basic ${encodedCredentials}`
            }
          };
          
          axios(config)
          .then(response => {
            props.signIn(response.data);
            history.push('/')
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <main>
        {console.log(props)}
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