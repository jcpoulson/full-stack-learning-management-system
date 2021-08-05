import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const PrivateRoute = ({component: Component, authenticatedUser: authUser, statePassword: statePassword, updateCourse: updateCourse}) => {
    
    // if user is logged in return route and component, if not logged in redirect to signin
    if (authUser.id) {
        return <Route render={()=> <Component authUser={authUser} statePassword={statePassword} updateCourse={updateCourse}/>} />
    } else {
        return <Redirect to="/signin" />
    }
    
    
}
    
  

export default PrivateRoute;
 