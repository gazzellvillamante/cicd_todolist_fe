import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/View.css';

function View() {
    const [todos, setTodos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [err, setErr] = useState("");
    const [editingTask, setEditingTask] = useState(null);
    const [editedTitle, setEditedTitle] = useState("");
    const [editedDescription, setEditedDescription] = useState("");
    const [editedCompleted, setEditedCompleted] = useState(false);
    const [created, setCreated] = useState(false); // Track task creation
    const navigate = useNavigate(); // For navigation after logout or create action

    useEffect(() => {
        // Fetch todos when the component mounts or `created` changes
        setLoading(true);
        const token = localStorage.getItem("Token");
        const userId = localStorage.getItem("user_id");

        let config = {
            method: 'get',
            url: `https://cicd-todolist-be.vercel.app/api/todos/`,
            headers: {
                'Authorization': `Token ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                // Only show todos belonging to the current user (filter by `user` instead of `user_id`)
                const userTodos = response.data.filter(todo => todo.user === parseInt(userId));
                setTodos(userTodos);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setErr(error.response ? error.response.data : "Something went wrong");
                setLoading(false);
            });
    }, [created]); // Re-fetch tasks whenever `created` state changes

    const handleDelete = (id) => {
        const token = localStorage.getItem("Token");

        let config = {
            method: 'delete',
            url: `https://cicd-todolist-be.vercel.app/api/todos/${id}/delete/`,
            headers: {
                'Authorization': `Token ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                // After deleting, filter out the deleted todo from the list
                setTodos(todos.filter(todo => todo.id !== id));
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleEdit = (id, title, description, completed) => {
        setEditingTask(id);
        setEditedTitle(title);
        setEditedDescription(description);
        setEditedCompleted(completed);
    };

    const handleUpdate = () => {
        const token = localStorage.getItem("Token");
        const userId = localStorage.getItem("user_id");

        const updatedData = JSON.stringify({
            user: userId,
            title: editedTitle,
            description: editedDescription,
            completed: editedCompleted
        });

        let config = {
            method: 'put',
            url: `https://cicd-todolist-be.vercel.app/api/todos/${editingTask}/update/`,
            headers: {
                'Authorization': `Token ${token}`,
                'Content-Type': 'application/json'
            },
            data: updatedData
        };

        axios.request(config)
            .then((response) => {
                // Update the todos array with the updated task
                setTodos(todos.map(todo =>
                    todo.id === editingTask ? { ...todo, title: editedTitle, description: editedDescription, completed: editedCompleted } : todo
                ));
                setEditingTask(null); // Close the edit mode
            })
            .catch((error) => {
                console.log(error);
            });
    };

    const handleCreateRedirect = () => {
        navigate("/create");  // Redirect to create page
    };

    const handleLogout = () => {
        const token = localStorage.getItem("Token");

        let config = {
            method: 'post',
            url: 'http://127.0.0.1:8000/api/logout/',
            headers: {
                'Authorization': `Token ${token}`
            }
        };

        axios.request(config)
            .then((response) => {
                console.log(response.data);
                localStorage.removeItem("Token");
                localStorage.removeItem("user_id");
                navigate("/"); // Redirect to the home page
            })
            .catch((error) => {
                console.log(error);
                setErr("Logout failed. Please try again.");
            });
    };

    return (
        <div className="view-container">
            <h1>View Todos</h1>

            {loading && <p>Loading todos...</p>}
            {err && <p className="error-message">{err}</p>}

            <div className="todos-list">
                {todos.map(todo => (
                    <div key={todo.id} className="todo-item">
                        <h3>{todo.title}</h3>
                        <p>{todo.description}</p>
                        <p>Status: {todo.completed ? "Completed" : "Pending"}</p>

                        {/* Edit button */}
                        <button onClick={() => handleEdit(todo.id, todo.title, todo.description, todo.completed)}>
                            Edit
                        </button>

                        {/* Delete button */}
                        <button onClick={() => handleDelete(todo.id)}>Delete</button>
                    </div>
                ))}
            </div>

            {editingTask && (
                <div className="edit-task-form">
                    <h3>Edit Task</h3>
                    <div>
                        <label>Title:</label>
                        <input
                            type="text"
                            value={editedTitle}
                            onChange={(e) => setEditedTitle(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Description:</label>
                        <textarea
                            value={editedDescription}
                            onChange={(e) => setEditedDescription(e.target.value)}
                        />
                    </div>
                    <div>
                        <label>Completed:</label>
                        <input
                            type="checkbox"
                            checked={editedCompleted}
                            onChange={(e) => setEditedCompleted(e.target.checked)}
                        />
                    </div>
                    <button onClick={handleUpdate}>Update Task</button>
                    <button onClick={() => setEditingTask(null)}>Cancel</button>
                </div>
            )}

            {/* Create Task Button */}
            <button className="create-btn" onClick={handleCreateRedirect}>
                Create Task
            </button>

            {/* Logout Button */}
            <button className="logout-btn" onClick={handleLogout}>
                Logout
            </button>
        </div>
    );
}

export default View;
