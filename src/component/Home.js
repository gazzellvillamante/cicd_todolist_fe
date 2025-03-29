import React from 'react';
import {Link} from "react-router-dom";
import '../css/Home.css'

function Home(props) {
    return (
        <div className="container">
            <nav className="navbar">
                <ul>
                    <li><Link to="/" className="nav-link">Home</Link></li>
                    <li><Link to="/register" className="nav-link">Register</Link></li>
                    <li><Link to="/login" className="nav-link">Login</Link></li>
                </ul>
            </nav>
        </div>
    );
}

export default Home;