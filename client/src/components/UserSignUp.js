import { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const UserSignUp = (props) => {
    const [firstName, setfirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [emailAddress, setEmailAddress] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    const history = useHistory();

    // This method handles state change
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

/* 
    This method on submit uses the apiHandlers signUp method to send a request to the API
    The rest of this function takes the response from the API and either proceeds to log 
    the user into the application or warns the user of validation errors
*/
    const submit = async () => {
        // Sending the request to the API
        let signUpRequest = await props.signUp(firstName, lastName, emailAddress, password);
        
        // API validation
        if (signUpRequest.error) {
            const error = signUpRequest.error;
            document.querySelector('.error-msg').textContent = error;
            document.querySelector('.validation--errors').style.display = 'block';
            return;
        }

        props.signIn(emailAddress, password);
        history.push('/')
    }

    return (
        <main>
            <div className="form--centered">
                <h2>Sign Up</h2>
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul>
                            <li className="error-msg">Fill out all required fields</li>
                        </ul>
                    </div>
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
                    <button className="button" id="signup-button" onClick={submit}>Sign Up</button><NavLink to="/"><button className="button button-secondary" id="signup-button" onClick="event.preventDefault();">Cancel</button></NavLink>
                </div>
                <p>Already have a user account? Click here to <NavLink to="/signin"><a>sign in</a></NavLink>!</p>
            </div>
        </main>
    )
}

export default UserSignUp;