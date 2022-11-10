import { Link } from 'react-router-dom';
import "./Navbar.css";
import Cookies from 'js-cookie';
import Logout from './Logout';

const Navbar = () => {
    console.log(Cookies.get('token'));
    if (Cookies.get('token') === undefined) {
        return (
        <nav className='navbar'>
            <div className='navbar-links'>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </div>
            <div className='navbar-links'>
                <ul>
                    <li>
                        <Link to="/v1/sandwiches">Sandwiches</Link>
                    </li>
                </ul>
            </div>
            <div className='navbar-links'>
                <ul>
                    <li>
                        <Link to="/v1/order">Orders</Link>
                    </li>
                </ul>
            </div>
            <div className='navbar-links'>
                <ul>
                    <li>
                        <Link to="/v1/user/login">Employee login</Link>
                    </li>
                </ul>
            </div>
        </nav>
        )}
    else {
        return(
        <nav className='navbar'>
            <div className='navbar-links'>
                <ul>
                    <li>
                        <Link to="/">Home</Link>
                    </li>
                </ul>
            </div>
            <div className='navbar-links'>
                <ul>
                    <li>
                        <Link to="/v1/sandwiches">Sandwiches</Link>
                    </li>
                </ul>
            </div>
            <div className='navbar-links'>
                <ul>
                    <li>
                        <Link to="/v1/order">Orders</Link>
                    </li>
                </ul>
            </div>
        </nav>
        )}
}

export default Navbar;

/*
        <nav>
            <div>
                <Link to='/sandwich'>Sandwiches</Link>
                <Link to='/order'>Orders</Link>
            </div>
        </nav>
*/
