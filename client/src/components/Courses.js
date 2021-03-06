// stateful component
import React, {useEffect, useState} from 'react';
import { NavLink } from 'react-router-dom';
import axios from 'axios';

const Courses = (props) => {
    const [courses, setCourses] = useState([]);

	useEffect(()=>{
		axios.get("http://localhost:5000/api/courses")
			.then(data => setCourses(data.data))
	}, [])

    // This function adds create course to validation history, if the user is not logged in and tries to access it
    const createCourseWhenNotLoggedIn = () => {
        if (!props.authenticatedUser.emailAddress ) {
            props.setValidationHistory('/courses/create')
        }
    }

    return(
        <main>
            <div className="wrap main--grid">
                {/* mapping through courses data */}
                {courses.map(course => 
                    <NavLink key={course.id} className="course--module course--link" to={`/courses/${course.id}`}>
                        <h2 className="course--label">Course</h2>
                        <h3 className="course--title">{course.title}</h3>
                    </NavLink>
                )}

                    {/* New Course Button */}
                    <NavLink onClick={createCourseWhenNotLoggedIn} className="course--module course--add--module" to="/courses/create">
                        <span class="course--add--title">
                            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" x="0px" y="0px"
                            viewBox="0 0 13 13" class="add"><polygon points="7,6 7,0 6,0 6,6 0,6 0,7 6,7 6,13 7,13 7,7 13,7 13,6 "></polygon></svg>
                            New Course
                        </span>
                    </NavLink>
            </div>
        </main>
    )
}

export default Courses;