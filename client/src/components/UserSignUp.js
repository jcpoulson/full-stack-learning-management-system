// Stateful Component

import { useState } from 'react';
import axios from 'axios';

const UserSignUp = () => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('')


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

    const submit = () => { // This submit function works just fine, it's just that the API returns a 400 status code
        if (password !== confirmPassword) {
            console.log("Passwords do not match");
        }

        const newUser = {firstName: firstName, lastName: lastName, emailAddress: emailAddress, password: password}
        console.log(JSON.stringify(newUser));
        
        axios.post('http://localhost:5000/api/users', JSON.stringify(newUser))
            .then(response => console.log(response))
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
                    <button className="button" onClick={submit}>Sign Up</button><button className="button button-secondary" onClick="event.preventDefault();">Cancel</button>
                </div>
                <p>Already have a user account? Click here to <a href="sign-in.html">sign in</a>!</p>
            </div>
        </main>
    )
}

export default UserSignUp;