import React, {useState, useEffect} from 'react';
import { useLocation, NavLink, useHistory } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import axios from 'axios';

const CourseDetail = (props) => {
    const location = useLocation();
    const history = useHistory();
    const splitUrl = location.pathname.split("/courses/");
    const courseId = splitUrl[1];

    const [currentCourse, setCurrentCourse] = useState({});

    useEffect(() => {
        axios.get(`http://localhost:5000/api/courses/${courseId}`)
            .then(course => setCurrentCourse(course.data))
    }, [])
    
    
    return (
        <main>
            {/* Render this menu bar only if the user is logged in and their id matches the userID for the course */}
                {props.authenticatedUser.id === currentCourse.userId ? 
                    <div className="actions--bar">
                        <div className="wrap">
                            <NavLink to={`/courses/${courseId}/update`} className="button">Update Course</NavLink>
                                <button className="button" onClick={() => { 
                                    props.deleteCourse(props.authenticatedUser.emailAddress, props.statePassword, currentCourse.id)
                                    setTimeout(() => history.push('/'), 1500)
                                }}>
                                Delete Course</button>
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
                            
                            <ReactMarkdown>{currentCourse.description}</ReactMarkdown>
                        </div>
                        <div>
                            <h3 className="course--detail--title">Estimated Time</h3>
                            <p>{currentCourse.estimatedTime}</p>

                            <h3 className="course--detail--title">Materials Needed</h3>
                            <ReactMarkdown>{currentCourse.materialsNeeded}</ReactMarkdown>
                        </div>
                    </div>
                </form>
            </div>
        </main>
    )
}

export default CourseDetail;