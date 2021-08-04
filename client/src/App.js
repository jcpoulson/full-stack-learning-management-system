import React, {useState } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Cookies from 'js-cookie';
import btoa from 'btoa';
import axios from 'axios';


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


import Api from './Api';

const App = () => {
	const [user, setUser] = useState(Cookies.getJSON('authenticatedUser') || {} );
	const [statePassword, setStatePassword] = useState('');

	const api = new Api();
	const signIn = api.signIn

	const signOut = () => {
		setUser({});
		Cookies.remove('authenticatedUser');
	}

	return (
		<div className="App">

			<BrowserRouter>
				<Header authenticatedUser={user} signOut={signOut} />
				<Switch>
					{/* Protected Routes*/}
					<PrivateRoute exact path="/courses/create" component={CreateCourse} authenticatedUser={user} statePassword={statePassword} />
					<PrivateRoute exact path="/courses/:id/update" component={UpdateCourse} authenticatedUser={user} statePassword={statePassword} />

					<Route exact path="/" component={Courses} />
					<Route exact path="/courses" component={Courses} />
					<Route exact path="/signup" component={UserSignUp} />
					<Route exact path="/courses/:id" render={()=> <CourseDetail authenticatedUser={user} statePassword={statePassword} />} />
					<Route exact path="/signin" render={()=> <UserSignIn signIn={signIn} setStatePassword={setStatePassword} />} />
				</Switch>
			</BrowserRouter>
		</div>
	);
}

export default App;

// const signIn = (userEmail, userPassword) => {
    //     const encodedCredentials = btoa(`${userEmail}:${userPassword}`);
    //     let config = {
    //         method: 'get',
    //         url: 'http://localhost:5000/api/users',
    //         headers: { 
    //           'Authorization': `Basic ${encodedCredentials}`
    //         }
    //       };
          
    //       axios(config)
    //       .then(response => {
    //         setUser(response.data);
    //         Cookies.set('authenticatedUser', JSON.stringify(response.data), { expires: 1 });
    //       })
    //       .catch(function (error) {
    //         console.log(error);
    //       });
    
    //       setStatePassword(userPassword); // this adds the password to application state
    // }