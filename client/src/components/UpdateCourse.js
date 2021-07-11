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
            .then(data => {
                setCourseTitle(data.data.title)
                setCourseDescription(data.data.description)
                setEstimatedTime(data.data.estimatedTime)
                setMaterialsNeeded(data.data.materialsNeeded)
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

    const submit = () => {
        const encodedCredentials = btoa(`${props.authUser.emailAddress}:${props.statePassword}`);
        let data = JSON.stringify({
            "id": courseId,
            "title": courseTitle,
            "description": courseDescription,
            "estimatedTime": estimatedTime,
            "materialsNeeded": materialsNeeded,
            "userId": props.authUser.id
          });
          
          let config = {
            method: 'put',
            url: `http://localhost:5000/api/courses/${courseId}`,
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Basic ${encodedCredentials}`
            },
            data : data
          };
          
          axios(config)
          .then(response => {
            console.log(JSON.stringify(response.data));
            history.push('/');
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <main>
            <div className="wrap">
                <h2>Update Course</h2>
                    <div className="main--flex">
                        <div>
                            <label for="courseTitle">Course Title</label>
                            <input id="courseTitle" name="courseTitle" type="text" onChange={change} value={courseTitle}/>

                            <p>By Joe Smith</p>

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