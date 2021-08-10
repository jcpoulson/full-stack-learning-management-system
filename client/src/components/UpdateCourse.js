import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation } from 'react-router-dom';
import Home from '../img/icons8-home.svg';
import Cancel from '../img/cancel.svg';
import axios from 'axios';

const UpdateCourse = (props) => {
    const location = useLocation();
    const history = useHistory();
    const splitUrl = location.pathname.split("/update");
    const courseId = splitUrl[0].split('/courses/')[1];

    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(course => {
                setCourseTitle(course.data.title)
                setCourseDescription(course.data.description)
                setEstimatedTime(course.data.estimatedTime)
                setMaterialsNeeded(course.data.materialsNeeded)
            })
    }, [])

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
    This method on submit uses the apiHandlers updateCourse method to send a request to the API
    The rest of this function takes the response from the API and either proceeds to the updated
    course page or warns the user of validation errors
*/
    const submit = async () => {
        // Sending the request to the API
        let updateRequest = await props.updateCourse(props.authUser.emailAddress, props.statePassword, courseId, courseTitle, courseDescription, estimatedTime, materialsNeeded, props.authUser.id);
        
        // API validation
        if (updateRequest.data.errors) {
            const errors = updateRequest.data.errors;
            const errorList = document.querySelector('.error-list')
            document.querySelector('.validation--errors').style.display = 'block';
            for (let i = 0; i < errors.length; i++) {
                let error = document.createElement('LI');
                error.textContent = errors[i];
                errorList.appendChild(error);
            }
            return;
        }

        history.push(`/courses/${courseId}`)
    }

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                    <div className="validation--errors">
                        <h3>Validation Errors</h3>
                        <ul className="error-list">

                        </ul>
                    </div>

                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" onChange={change} value={courseTitle}/>

                            <p>By {props.authUser.firstName} {props.authUser.lastName}</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" onChange={change} value={courseDescription}></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" onChange={change} value={estimatedTime} />

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" onChange={change} value={materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit" onClick={submit}>Update Course</button>
                    <NavLink to="/" className="button" id="button-return">Return to List <img src={Home} class="return-home-icon" alt="home icon"/></NavLink>
                    <NavLink to={`/courses/${courseId}`} className="button" id="button-cancel">Cancel <img src={Cancel} class="return-home-icon" alt="cancel icon"/></NavLink>
                
            </div>
        </main>
    )
}

export default UpdateCourse;