import React, { useState, useEffect } from 'react';
import { NavLink, useLocation } from 'react-router-dom';
import axios from 'axios';

const UpdateCourse = () => {
    const location = useLocation();
    const splitUrl = location.pathname.split("/update");
    const courseId = splitUrl[0].split('/courses/')[1];

    const [currentCourse, setCurrentCourse] = useState({});
    const [courseTitle, setCourseTitle] = useState('');
    const [courseDescription, setCourseDescription] = useState('');
    const [estimatedTime, setEstimatedTime] = useState('');
    const [materialsNeeded, setMaterialsNeeded] = useState('');

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(data => setCurrentCourse(data.data))
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

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" value={currentCourse.title} onChange={change}/>

                            <p>By Joe Smith</p>

                            <label for="courseDescription">Course Description</label>
                            <textarea id="courseDescription" name="courseDescription" value={currentCourse.description}></textarea>
                        </div>
                        <div>
                            <label for="estimatedTime">Estimated Time</label>
                            <input id="estimatedTime" name="estimatedTime" type="text" value={currentCourse.estimatedTime} />

                            <label for="materialsNeeded">Materials Needed</label>
                            <textarea id="materialsNeeded" name="materialsNeeded" value={currentCourse.materialsNeeded}></textarea>
                        </div>
                    </div>
                    <button className="button" type="submit">Update Course</button><button className="button button-secondary" onclick="event.preventDefault(); location.href='index.html';">Cancel</button>
                </form>
            </div>
        </main>
    )
}

export default UpdateCourse;