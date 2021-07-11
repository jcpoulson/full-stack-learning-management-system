import React, {useState, useEffect} from 'react';
import { useLocation, NavLink } from 'react-router-dom';
import axios from 'axios';

const CourseDetail = (props) => {
    const location = useLocation();

    const splitUrl = location.pathname.split("/courses/");
    const courseId = splitUrl[1];

    const [currentCourse, setCurrentCourse] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(data => setCurrentCourse(data.data))
    }, [])

    return (
        <main>
            {/* Render this menu bar only if the user is logged in and their id matches the userID for the course */}
                {props.authenticatedUser.id === currentCourse.userId ? 
                    <div className="actions--bar">
                        <div className="wrap">
                            <NavLink to={`/courses/${courseId}/update`} className="button">Update Course</NavLink>
                            <NavLink to="/courses/:id/update" className="button">Delete Course</NavLink>
                            <NavLink to="/" className="button button-secondary">Return to List</NavLink>
                        </div>
                    </div>
                :
                    <div className="actions--bar">
                        <div className="wrap">
                            <NavLink to="/" className="button button-secondary">Return to List</NavLink>
                        </div>
                    </div>
                }
            
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