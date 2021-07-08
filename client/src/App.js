import React, {useState, useEffect} from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


// Components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';


const App = () => {
	const [user, setUser] = useState({});

	return (
		<div className="App">

			<BrowserRouter>
				<Header />
				<Switch>
					<Route exact path="/" render={()=> <Courses />} />
					<Route exact path="/courses" render={()=> <Courses />} />
					<Route exact path="/courses/create" component={CreateCourse} />
					<Route exact path="/courses/:id/update" component={UpdateCourse} />
					<Route exact path="/courses/:id" component={CourseDetail} />
					<Route exact path="/signin" render={()=> <UserSignIn signIn={setUser} />} />
					<Route exact path="/signup" component={UserSignUp} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;
