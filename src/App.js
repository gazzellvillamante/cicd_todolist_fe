import './App.css';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Create from "./component/Create";
import View from "./component/View";
import Home from "./component/Home";
import Register from "./component/Register";
import Login from "./component/Login";
import Logout from "./component/Logout";


function App() {
    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>} />
                    <Route path="/register" element={<Register/>} />
                    <Route path="/login" element={<Login/>} />
                    <Route path="/create" element={<Create />} />
                    <Route path="/view" element={<View />} />
                    <Route path="/logout" element={<Logout/>} />
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;