import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../components/css/Navbar.css'; // Ensure this path is correct.

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
                    <li className="nav-item">
                        <Link to='/holidays' className='nav-links'>
                            Holidays
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/overtime' className='nav-links'>
                            Overtime
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/swaps' className='nav-links'>
                            Swaps
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/viewer' className='nav-links'>
                            Crew Viewer
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/notifications' className='nav-links'>
                            Notifications
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar;
