import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';

const CreateCourse = (props) => {
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');

    const history = useHistory();

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

    const submit = async () => {
        // client side validation
        if (courseTitle.length === 0 || courseDescription.length === 0) {
            document.querySelector('.validation--errors').style.display = 'block';
            return;
        }
        
        let createCourseRequest = await props.createCourse(props.authUser.emailAddress, props.statePassword, courseTitle, courseDescription, estimatedTime, materialsNeeded, props.authUser.id);
        if (createCourseRequest.status !== 201) {
            // redirect to Error component
        }
        history.push('/');
    }

    return(
        <main>
            <div className="wrap">
                <h2>Create Course</h2>
                <div className="validation--errors">
                    <h3>Validation Errors</h3>
                    <ul>
                        <li>Please provide a value for "Title"</li>
                        <li>Please provide a value for "Description"</li>
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