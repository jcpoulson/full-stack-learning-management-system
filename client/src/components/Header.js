// Stateless component
import { NavLink } from "react-router-dom";

const Header = (props) => {
    return(
        <header>
            <div className="wrap header--flex">
                <NavLink to="/">
                    <h1 className="header--logo">Courses</h1>
                    <h1>Dev-Branch</h1>
                </NavLink>
                <nav>
                {props.authenticatedUser.id 
                    ?
                        <ul className="header--signedout">
                            <li>Welcome {props.authenticatedUser.firstName} {props.authenticatedUser.lastName}</li>
                            <NavLink to="/signout" >
                                <li>Sign Out</li>
                            </NavLink>
                        </ul>
                    :
                    <ul className="header--signedout">
                            <NavLink to="/signup">
                                <li>Sign Up</li>
                            </NavLink>
                            <NavLink to="/signin">
                                <li>Sign In</li>
                            </NavLink>
                        </ul>
                 }    
                </nav>
            </div>
        </header>
    )
}

export default Header;