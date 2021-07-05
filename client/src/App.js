import React, {useState, useEffect} from 'react';
import axios from "axios";
import './reset.css';
import './App.css';

const App = () => {
const [courses, setCourses] = useState();

useEffect(()=>{
  axios.get("http://localhost:5000/api/courses")
    .then(data => setCourses(data.data))
}, [])

  return (
    <div className="App">
      
    </div>
  );
}

export default App;
