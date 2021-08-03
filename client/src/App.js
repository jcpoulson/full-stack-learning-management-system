import React, {useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';


// Components
import Header from './components/Header';
import Courses from './components/Courses';
import CreateCourse from './components/CreateCourse';
import UpdateCourse from './components/UpdateCourse';
import CourseDetail from './components/CourseDetail';
import UserSignIn from './components/UserSignIn';
import UserSignUp from './components/UserSignUp';
import UserSignOut from './components/UserSignOut';
import PrivateRoute from './components/PrivateRoute';


const App = () => {
	const [user, setUser] = useState(Cookies.getJSON('authenticatedUser') || {} );
	const [statePassword, setStatePassword] = useState('');

	return (
		<div className="App">

			<BrowserRouter>
				<Header authenticatedUser={user} UserSignOut={UserSignOut}/>
				<Switch>
					{/* Protected Routes*/}
					<PrivateRoute exact path="/courses/create" component={CreateCourse} authenticatedUser={user} statePassword={statePassword} />
					<PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} authenticatedUser={user} statePassword={statePassword} />

					<Route exact path="/" component={Courses} />
					<Route exact path="/courses" component={Courses} />
					<Route exact path="/signup" component={UserSignUp} />
					<Route exact path="/courses/:id" render={()=> <CourseDetail authenticatedUser={user} statePassword={statePassword} />} />
					<Route exact path="/signin" render={()=> <UserSignIn signIn={setUser} setStatePassword={setStatePassword} />} />

					<Route exact path="/signout" component={UserSignOut} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;