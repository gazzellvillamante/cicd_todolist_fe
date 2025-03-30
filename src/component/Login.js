import React, { useState } from 'react';
import { Base_Url } from "../constants"; // API URL
import axios from "axios";
import '../css/Login.css';

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    // Handler for username input
    function usernameChangeHandler(event) {
        setUsername(event.target.value);
    }

    // Handler for password input
    function passwordChangeHandler(event) {
        setPassword(event.target.value);
    }

    // Login function
    function login() {
        setLoading(true);

        // Prepare data to send to the backend
        const data = JSON.stringify({
            username: username,
            password: password
        });

        const config = {
            method: 'post',
            url: `${Base_Url}/api/login/`, // API endpoint for login
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log("Response Data:", JSON.stringify(response.data));

                // Check the response structure and handle accordingly
                if (response.data.token && response.data.user_id) {
                    localStorage.setItem("Token", response.data.token);
                    localStorage.setItem("user_id", response.data.user_id);  // Correct field name
                    setErr("Login success");
                    setLoading(false);
                    window.location.href = "/view";  // Redirect after login
                } else {
                    setErr("Unexpected response structure. Please check the response format.");
                    setLoading(false);
                }
            })
            .catch((error) => {
                // Enhanced error logging
                if (error.response) {
                    // If the error is due to a bad response from the server
                    console.log("Error Response:", error.response);
                    setErr(error.response.data ? error.response.data : "Something went wrong with the request.");
                } else if (error.request) {
                    // If no response was received
                    console.log("Error Request:", error.request);
                    setErr("No response received. Please check your network or API server.");
                } else {
                    // For any other errors (e.g., setup issues)
                    console.log("Error Message:", error.message);
                    setErr("An unexpected error occurred.");
                }

                setLoading(false);
            });
    }

    return (
        <div className="login-container">
            <h1>Login</h1>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={usernameChangeHandler}
                    className="input-field"
                />
            </div>
            <div className="form-group">
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={passwordChangeHandler}
                    className="input-field"
                />
            </div>
            <button onClick={login} className="btn">{loading ? 'Logging in...' : 'Login'}</button>
            {err && <p className="error-message">{err}</p>}
        </div>
    );
}

export default Login;
