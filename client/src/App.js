import React, {useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


// Components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
	const [user, setUser] = useState({});
	const [statePassword, setStatePassword] = useState('');

	const signout = () => {
		setUser({});
	}

	return (
		<div className="App">

			<BrowserRouter>
				<Header authenticatedUser={user} signOut={signout}/>
				<Switch>
					{/* Protected Routes*/}
					<PrivateRoute exact path="/courses/create" component={CreateCourse} authenticatedUser={user} statePassword={statePassword} />
					<Route exact path="/courses/:id/update" component={UpdateCourse} /> {/* Protect this route */}

					<Route exact path="/" component={Courses} />
					<Route exact path="/courses" component={Courses} />
					<Route exact path="/signup" component={UserSignUp} />
					<Route exact path="/courses/:id" render={()=> <CourseDetail authenticatedUser={user} />} />
					<Route exact path="/signin" render={()=> <UserSignIn signIn={setUser} setStatePassword={setStatePassword} />} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;