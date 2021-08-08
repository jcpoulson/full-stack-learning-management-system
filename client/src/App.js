import React, {useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import ApiHandler from './ApiHandler';


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
import NotFound from './components/NotFound';
import Forbidden from './components/Forbidden';
import UnhandledError from './components/UnhandledError';

const App = () => {
	const apiHandler = new ApiHandler();

	const [user, setUser] = useState(Cookies.getJSON('authenticatedUser') || {} );
	const [statePassword, setStatePassword] = useState(Cookies.getJSON('statePassword') || '' ); // this is in state so that the password is globally available to the application
	const [validationHistory, setValidationHistory] = useState('');

	const signIn = async (userEmail, userPassword) => {
		const apiResponseData = await apiHandler.signIn(userEmail, userPassword);
		setUser(apiResponseData);
		setStatePassword(userPassword);
		Cookies.set('authenticatedUser', JSON.stringify(apiResponseData), { expires: 1 });
		Cookies.set('statePassword', JSON.stringify(userPassword), { expires: 1 });
	}


	const signOut = () => {
		setUser({});
		setStatePassword('');
	}

	return (
		<div className="App">

			<BrowserRouter>
<<<<<<< HEAD
				<Header authenticatedUser={user} />
=======
				<Header authenticatedUser={user} UserSignOut={UserSignOut}/>
>>>>>>> 6af826abfc8695dcc13a6f6e7e7c5042ce1d4a70
				<Switch>

					{/* Protected Routes*/}
<<<<<<< HEAD
					<PrivateRoute exact path="/courses/create" component={CreateCourse} authenticatedUser={user} statePassword={statePassword} createCourse={apiHandler.createCourse} />
					<PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} authenticatedUser={user} statePassword={statePassword} updateCourse={apiHandler.updateCourse}/>

					<Route exact path="/" render={() => <Courses setValidationHistory={setValidationHistory} authenticatedUser={user} statePassword={statePassword}/>} />
					<Route exact path="/courses" render={() => <Courses setValidationHistory={setValidationHistory} authenticatedUser={user} statePassword={statePassword}/>} />
					<Route exact path="/signup" render={()=> <UserSignUp signUp={apiHandler.signUp} signIn={signIn} />} />
					<Route exact path="/courses/:id" render={()=> <CourseDetail authenticatedUser={user} statePassword={statePassword} deleteCourse={apiHandler.deleteCourse} />} />
					<Route exact path="/signin" render={()=> <UserSignIn signIn={signIn} setStatePassword={setStatePassword} validationHistory={validationHistory} setValidationHistory={setValidationHistory} />} />
					<Route exact path="/signout" render={() => <UserSignOut signOut={signOut} />} />

					<Route path="/notfound" component={NotFound} />
					<Route path="/forbidden" component={Forbidden} />
					<Route path="/error" component={UnhandledError} />
=======
					<PrivateRoute exact path="/courses/create" component={CreateCourse} authenticatedUser={user} statePassword={statePassword} />
					<PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} authenticatedUser={user} statePassword={statePassword} />

					<Route exact path="/" component={Courses} />
					<Route exact path="/courses" component={Courses} />
					<Route exact path="/signup" component={UserSignUp} />
					<Route exact path="/courses/:id" render={()=> <CourseDetail authenticatedUser={user} statePassword={statePassword} />} />
					<Route exact path="/signin" render={()=> <UserSignIn signIn={setUser} setStatePassword={setStatePassword} />} />

					<Route exact path="/signout" component={UserSignOut} />
>>>>>>> 6af826abfc8695dcc13a6f6e7e7c5042ce1d4a70
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;