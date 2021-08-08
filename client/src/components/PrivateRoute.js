import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

const PrivateRoute = ({component: Component, authenticatedUser: authUser, statePassword: statePassword, updateCourse: updateCourse, createCourse: createCourse}) => {
    
    // if user is logged in return route and component, if not logged in redirect to signin
    if (authUser.id) {
        return <Route render={()=> <Component authUser={authUser} statePassword={statePassword} updateCourse={updateCourse} createCourse={createCourse}/>} />
    } else {
        return <Redirect to="/signin" />
    }
    
    
}
    
  

export default PrivateRoute;
 