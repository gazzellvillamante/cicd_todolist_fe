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

    const data = JSON.stringify({
        username: username,
        password: password
    });

    const config = {
        method: 'post',
        url: `${Base_Url}/api/login/`,
        headers: {
            'Content-Type': 'application/json'
        },
        data: data
    };

    axios.request(config)
        .then((response) => {
            console.log("Response Data:", JSON.stringify(response.data));

            if (response.data.token && response.data.user_id) {
                localStorage.setItem("Token", response.data.token);
                localStorage.setItem("user_id", response.data.user_id);
                setErr("Login success");
                setLoading(false);
                window.location.href = "/view";  // Redirect after login
            } else {
                setErr("Unexpected response structure. Please check the response format.");
                setLoading(false);
            }
        })
        .catch((error) => {
            if (error.response) {
                console.log("Error Response:", error.response);
                if (error.response.data.non_field_errors) {
                    // Handle non_field_errors if it's an array
                    setErr(error.response.data.non_field_errors.join(", "));
                } else if (typeof error.response.data === 'object') {
                    // Handle error response when it's an object (stringify it to avoid rendering object)
                    setErr(JSON.stringify(error.response.data));
                } else {
                    setErr(error.response.data.detail || "An error occurred during login.");
                }
            } else if (error.request) {
                console.log("Error Request:", error.request);
                setErr("No response received. Please check your network or API server.");
            } else {
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
