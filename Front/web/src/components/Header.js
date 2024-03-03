import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";

function Header() {
    return (
        <div className="header" style={Header.css}>
            <div className="header-container" style={Header.css}>
                <Link to="/" className="header-logo" style={Header.css}>
                    CrewScheduler Pro <i class="fab fa-typo3"></i>
                </Link>
            </div>
        </div>
    );
    }

export default Header;