import React, { useState, useEffect } from 'react';
import { NavLink, useHistory, useLocation, Redirect } from 'react-router-dom';
import btoa from 'btoa';
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
        props.updateCourse(props.authUser.emailAddress, props.statePassword, courseId, courseTitle, courseDescription, estimatedTime, materialsNeeded, props.authUser.id);
        history.push(`/courses/${courseId}`)
    }

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
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
                    <button className="button" type="submit" onClick={submit}>Update Course</button><NavLink to="/"><NavLink to="/" className="button button-secondary">Return to List</NavLink></NavLink>
                
            </div>
        </main>
    )
}

export default UpdateCourse;