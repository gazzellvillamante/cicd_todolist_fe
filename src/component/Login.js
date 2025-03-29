import React, {useEffect, useState} from 'react';
import {Base_Url} from "../constants";
import axios from "axios";
import '../css/Login.css'

function Login(props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("Token") !== null) {
            window.location.href = "/logout";
        }
    }, []);

    function usernameChangeHandler(event) {
        setUsername(event.target.value);
    }

    function passwordChangeHandler(event) {
        setPassword(event.target.value);
    }

    function login() {
        setLoading(true);
        let data = JSON.stringify({
            "username": username,
            "password": password
        });

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: Base_Url+'/api/login/',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.setItem("Token", response.data.token);
                setErr("Login success");
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setErr(error.response.data);
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