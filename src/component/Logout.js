import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Base_Url} from "../constants";
import '../css/Logout.css'

function Logout(props) {
    const [token, setToken] = useState("")
    const [err, setErr] = useState("")

    useEffect(() => {
        setToken(localStorage.getItem("Token"));
    }, [token]);

    function logout() {
        let data = '';

        let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: Base_Url+'/api/logout/',
            headers: {
                'Authorization': 'Token ' + token
            },
            data: data
        };

        axios.request(config)
            .then((response) => {
                console.log(JSON.stringify(response.data));
                localStorage.removeItem("Token");
                window.location.href = "/login";
            })
            .catch((error) => {
                console.log(error);
                setErr(error.response.data);
            });

    }

    return (
        <div className="logout-container">
            <h1>Logout</h1>
            <button onClick={logout} className="btn">Logout</button>
            {err && <p className="error-message">{err}</p>}
        </div>
    );
}

export default Logout;