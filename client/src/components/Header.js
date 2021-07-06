// Stateless component
import { NavLink } from "react-router-dom";

const Header = () => {
    return(
        <header>
            <div className="wrap header--flex">
                <NavLink to="/">
                    <h1 className="header--logo">Courses</h1>
                </NavLink>
                <nav>
                    <ul className="header--signedout">
                        <NavLink to="/signup">
                            <li>Sign Up</li>
                        </NavLink>
                        <NavLink to="/signin">
                            <li>Sign In</li>
                        </NavLink>
                    </ul>
                </nav>
            </div>
        </header>
    )
}

export default Header;