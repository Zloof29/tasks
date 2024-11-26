import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../HomeArea/Home/Home";
import { About } from "../../AboutArea/About/About";
import { Page404 } from "../Page404/Page404";
import { Register } from "../../UserArea/Register/Register";
import { Login } from "../../UserArea/Login/Login";
import { TaskList } from "../../TaskArea/TaskList/TaskList";
import { AddTask } from "../../TaskArea/AddTask/AddTask";

export function Routing(): JSX.Element {
    return (
        <div className="Routing">
			<Routes>

                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/new-task" element={<AddTask />} />
                <Route path="/about" element={<About />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Page404 />} />
                
            </Routes>
        </div>
    );
}
