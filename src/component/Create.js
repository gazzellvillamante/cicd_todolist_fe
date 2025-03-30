import React, { useState } from 'react';
import { Base_Url } from "../constants";  // You can use this if you want to keep API URLs in one place
import axios from "axios";
import '../css/Create.css';  // Create a CSS file for styling, similar to Register.css, Login.css

function Create(props) {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [completed, setCompleted] = useState(false);
    const [err, setErr] = useState("");
    const [loading, setLoading] = useState(false);

    // Retrieve the user_id from localStorage to make it dynamic
    const userId = localStorage.getItem("user_id");

    // Handle the input changes
    function titleChangeHandler(event) {
        setTitle(event.target.value);
    }

    function descriptionChangeHandler(event) {
        setDescription(event.target.value);
    }

    function completedChangeHandler(event) {
        setCompleted(event.target.checked);
    }

    // Handle form submission to create the todo
    function createTodo() {
        if (title === "" || description === "") {
            setErr("Please enter both title and description");
        } else {
            // Check if the user is authenticated
            if (!userId) {
                setErr("User is not authenticated. Please log in.");
                return;
            }

            setLoading(true);

            const token = localStorage.getItem("Token"); // Assuming token is stored in localStorage

            const data = JSON.stringify({
                user: userId,  // Use the dynamic user ID from localStorage
                title: title,
                description: description,
                completed: completed
            });

            const config = {
                method: 'post',
                url: `${Base_Url}/api/todos/create/`,  // API endpoint to create the todo
                headers: {
                    'Authorization': `Token ${token}`,
                    'Content-Type': 'application/json'
                },
                data: data
            };

            axios.request(config)
                .then((response) => {
                    console.log(JSON.stringify(response.data));
                    setErr("Todo created successfully");
                    setLoading(false);
                    window.location.href = "/view";
                })
                .catch((error) => {
                    console.log(error);
                    setErr(error.response ? error.response.data : "Something went wrong");
                    setLoading(false);
                });
        }
    }

    return (
        <div className="create-container">
            <h1>Create Todo</h1>
            <div className="form-group">
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={titleChangeHandler}
                    className="input-field"
                />
            </div>
            <div className="form-group">
                <textarea
                    placeholder="Description"
                    value={description}
                    onChange={descriptionChangeHandler}
                    className="input-field"
                />
            </div>
            <div className="form-group">
                <label>
                    Completed:
                    <input
                        type="checkbox"
                        checked={completed}
                        onChange={completedChangeHandler}
                    />
                </label>
            </div>
            <button onClick={createTodo} className="btn">{loading ? 'Creating Todo...' : 'Create Todo'}</button>
            {err && <p className="error-message">{err}</p>}
        </div>
    );
}

export default Create;
