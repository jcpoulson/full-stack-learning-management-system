import React, { useState } from 'react';
import { NavLink, useHistory } from 'react-router-dom';
import axios from 'axios';
import btoa from 'btoa';

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

    const submit = () => {
        const validationErrorField = document.querySelector('.validation--errors');

        if (courseTitle.length === 0 || courseDescription.length === 0) {
            validationErrorField.style.display = 'block';
        }
        
        const encodedCredentials = btoa(`${props.authUser.emailAddress}:${props.statePassword}`);
        
        let data = JSON.stringify({
            "title": courseTitle,
            "description": courseDescription,
            "estimatedTime": estimatedTime,
            "materialsNeeded": materialsNeeded,
            "teacherId": props.authUser.id
          });
          
          let config = {
            method: 'post',
            url: 'http://localhost:5000/api/courses',
            headers: { 
              'Content-Type': 'application/json', 
              'Authorization': `Basic ${encodedCredentials}`
            },
            data : data
          };
          
          axios(config)
          .then(function (response) {
            console.log(JSON.stringify(response.data));
            history.push('/')
          })
          .catch(function (error) {
            console.log(error);
          });
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