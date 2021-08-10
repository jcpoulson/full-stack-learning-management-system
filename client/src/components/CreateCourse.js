import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const CreateCourse = (props) => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');

    const history = useHistory();

    // Method that handles state change
    const change = (event) => {
        if (event.target.id === "courseTitle") {
            setCourseTitle(event.target.value);
        } else if (event.target.id === "courseDescription") {
            setCourseDescription(event.target.value);
        } else if (event.target.id === "estimatedTime") {
            setEstimatedTime(event.target.value);
        } else if (event.target.id === "materialsNeeded") {
            setMaterialsNeeded(event.target.value);
        }
    }

/* 
    This method on submit uses the apiHandlers createCourse method to send a request to the API
    The rest of this function takes the response from the API and either proceeds or warns the 
    user of validation errors
*/
    const submit = async () => {
        // sending the request to the API 
        let createCourseRequest = await props.createCourse(props.authUser.emailAddress, props.statePassword, courseTitle, courseDescription, estimatedTime, materialsNeeded, props.authUser.id);
        
        // API validation
        if (createCourseRequest.data.errors) {
            const errors = createCourseRequest.data.errors;
            const errorList = document.querySelector('.error-list')
            document.querySelector('.validation--errors').style.display = 'block';
            for (let i = 0; i < errors.length; i++) {
                let error = document.createElement('LI');
                error.textContent = errors[i];
                errorList.appendChild(error);
            }

            return;
        }
        history.push('/');
    }

    return(
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul className="error-list">
                        
                    </ul>
                </div>

                
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" onChange={change} />

                            <p>By {props.authUser.firstName} {props.authUser.lastName}</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" onChange={change} ></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={change} />

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={change} ></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={submit}>Create Course</button><NavLink to="/"><button className="button button-secondary" >Cancel</button></NavLink>
                
            </div>
        </main>
    );
}

export default CreateCourse;