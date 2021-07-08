import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const UserSignUp = (props) => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')

    // This method updates state when the form changes
    const change = (event) => {
        if (event.target.id === "firstName") {
            setfirstName(event.target.value);
        } else if (event.target.id === "lastName") {
            setLastName(event.target.value);
        } else if (event.target.id === "emailAddress") {
            setEmailAddress(event.target.value);
        } else if (event.target.id === "password") {
            setPassword(event.target.value);
        } else if (event.target.id === "confirmPassword") {
            setConfirmPassword(event.target.value);
        }
    }

    // This method sets up the post request to the API
    const submit = () => {
        // checks to see if password fields match 
        if (password !== confirmPassword) {
            console.log("Passwords do not match");
        }

        // setting up the post request with axios
        let data = JSON.stringify({
            "firstName": firstName,
            "lastName": lastName,
            "emailAddress": emailAddress,
            "password": password
          });
          
          let config = {
            method: 'post',
            url: 'http://localhost:5000/api/users',
            headers: { 
              'Content-Type': 'application/json'
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
          })
          .catch(function (error) {
            console.log(error);
          });
          props.history.push('/')
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                <div>
                    <label for="firstName">First Name</label>
                    <input onChange={change} id="firstName" name="firstName" type="text"/>
                    <label for="lastName">Last Name</label>
                    <input onChange={change} id="lastName" name="lastName" type="text"/>
                    <label for="emailAddress">Email Address</label>
                    <input onChange={change} id="emailAddress" name="emailAddress" type="email"/>
                    <label for="password">Password</label>
                    <input onChange={change} id="password" name="password" type="password"/>
                    <label for="confirmPassword">Confirm Password</label>
                    <input onChange={change} id="confirmPassword" name="confirmPassword" type="password"/>
                    <button className="button" onClick={submit}>Sign Up</button><NavLink to="/"><button className="button button-secondary" onClick="event.preventDefault();">Cancel</button></NavLink>
                </div>
                <p>Already have a user account? Click here to <NavLink to="/signin"><a>sign in</a></NavLink>!</p>
            </div>
        </main>
    )
}

export default UserSignUp;