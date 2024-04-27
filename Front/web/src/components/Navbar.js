import React, {useState} from 'react'
import { Link } from 'react-router-dom'
import '../components/css/Navbar.css'

function Navbar() {
    const [click, setClick] = useState(false);

    const handleClick = () => setClick(!click);

  return (
    <>
        <nav className="navbar">
            <div className="navbar-container" style={Navbar.css}>
                <ul className={click ? 'nav-menu active' : 'nav-menu'}>
            
                    <li className="nav-item">
                        <Link to='/holidays' className='nav-links' style={Navbar.css}>
                            Holidays
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/overtime' className='nav-links' style={Navbar.css}>
                            Overtime
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/swaps' className='nav-links' style={Navbar.css}>
                            Swaps
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/viewer' className='nav-links' style={Navbar.css}>
                            Crew Viewer
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link to='/notifications' className='nav-links' style={Navbar.css}>
                            Notifications
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    </>
  )
}

export default Navbar
