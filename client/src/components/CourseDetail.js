// Stateful component

// have this component make a request to the API using the course ID in the route/URL
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = () => {
    const location = useLocation();
    const currentCourseId = location.pathname[location.pathname.length - 1];

    const [currentCourse, setCurrentCourse] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${currentCourseId}`)
            .then(data => setCurrentCourse(data.data))
    }, [])
    console.log(currentCourse);

    return (
        <main>
            <div className="actions--bar">
                <div className="wrap">
                    <a className="button" href="update-course.html">Update Course</a>
                    <a className="button" href="#">Delete Course</a>
                    <a className="button button-secondary" href="index.html">Return to List</a>
                </div>
            </div>
            
            <div className="wrap">
                <h2>Course Detail</h2>
                <form>
                    <div className="main--flex">
                        <div>
                            <h3 className="course--detail--title">Course</h3>
                            <h4 className="course--name">{currentCourse.title}</h4>
                            <p>User ID: {currentCourse.userId}</p>
                            
                            <p>{currentCourse.description}</p>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{currentCourse.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <h2>{currentCourse.materialsNeeded}</h2>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail;