import React, {useState} from 'react';
import Home from "./Home";
import {Base_Url} from "../constants";
import axios from "axios";
import '../css/Register.css'

function Register(props) {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState("")
    const [loading, setLoading] = useState(false);

    function usernameChangeHandler(event) {
        setUsername(event.target.value);
    }

    function emailChangeHandler(event) {
        setEmail(event.target.value);
    }

    function passwordChangeHandler(event) {
        setPassword(event.target.value);
    }

    function register() {
        if (username === "" || email === "" || password === "") {
            setErr("Please enter all fields");
        } else {
            setLoading(true);
            let data = JSON.stringify({
              "username": username,
              "email": email,
              "password": password
            });

            let config = {
              method: 'post',
              maxBodyLength: Infinity,
              url: Base_Url+'/api/register/',
              headers: {
                'Content-Type': 'application/json'
              },
              data : data
            };

            axios.request(config)
            .then((response) => {
              console.log(JSON.stringify(response.data));
              setErr("Register success")
                setLoading(false);
            })
            .catch((error) => {
              console.log(error);
              setErr((error.response.data))
                setLoading(false);
            });
        }

    }

    return (
        <div className="register-container">
            <Home />
            <h1>Register</h1>
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
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={emailChangeHandler}
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
            <button onClick={register} className="btn">{loading ? 'Registering...' : 'Register'}</button>
            {err && <p className="error-message">{err}</p>}
        </div>
    );
}

export default Register;