import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from "axios";


// Components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';


const App = () => {
	const [courses, setCourses] = useState([]); // move this state data to courses component

	useEffect(()=>{
		axios.get("http://localhost:5000/api/courses")
			.then(data => setCourses(data.data))
	}, []) // Move this state data to courses component

	return (
		<div className="App">
			<Header />

			<BrowserRouter>
				<Switch>
					<Route exact path="/" render={()=> <Courses courses={courses}/>} />
					<Route exact path="/courses" render={()=> <Courses courses={courses}/>} />
					<Route exact path="/courses/create" component={CreateCourse} />
					<Route exact path="/courses/:id/update" component={UpdateCourse} />
					<Route exact path="/courses/:id" component={CourseDetail} />
					<Route exact path="/signin" component={UserSignIn} />
					<Route exact path="/signup" component={UserSignUp} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
