import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from "axios";
import './reset.css';
import './App.css';

// Components
import Header from './components/Header';
import Courses from './components/Courses';


const App = () => {
	const [courses, setCourses] = useState();

	useEffect(()=>{
		axios.get("http://localhost:5000/api/courses")
			.then(data => setCourses(data.data))
	}, [ ])

	return (
		<div className="App">
			<Header />
			<Courses courses={courses}/>

			{/* <BrowserRouter>
				<Switch>
					<Route exact path="/" component={} />
				</Switch>
			</BrowserRouter> */}
		</div>
	);
}

export default App;
