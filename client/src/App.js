import React, {useState, useEffect} from 'react';
import axios from "axios";
import './App.css';

const App = () => {
const [courses, setCourses] = useState();

useEffect(()=>{
  axios.get("http://localhost:5000/api/courses")
    .then(data => setCourses(data.data))
}, [])

  return (
    <div className="App">
		{/* {courses.map(course => <h1>{course.title}</h1>)}  */} { /* This code on the left renders on the page then freaks out after a refresh*/}
    </div>
  );
}

export default App;
