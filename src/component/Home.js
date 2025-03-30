import React from 'react';
import { Link } from 'react-router-dom';
import '../css/Home.css';

function Home(props) {
    return (
        <div className="home-container">
            <div className="header">
                <h1>TaskMaster</h1>
            </div>

            <div className="button-container">
                <Link to="/" className="btn home-btn">Home</Link>
                <Link to="/register" className="btn register-btn">Register</Link>
                <Link to="/login" className="btn login-btn">Login</Link>
            </div>
        </div>
    );
}

export default Home;
