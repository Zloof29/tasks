import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../HomeArea/Home/Home";
import { About } from "../../AboutArea/About/About";
import { Page404 } from "../Page404/Page404";
import { Register } from "../../UserArea/Register/Register";
import { Login } from "../../UserArea/Login/Login";
import { TaskList } from "../../TaskArea/TaskList/TaskList";
import { AddTask } from "../../TaskArea/AddTask/AddTask";
import { EditTask } from "../../TaskArea/EditTask/EditTask";
import { TaskModel } from "../../../Models/TaskModel";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { useEffect } from "react";
import { taskService } from "../../../Services/TaskService";

export function Routing(): JSX.Element {

    const task = useSelector<AppState, TaskModel>((state) => state.tasks ? state.tasks[0] : null);
    const userId = useSelector<AppState, number>((state) => state.user.id);

    useEffect(() => {
        taskService.getAllTask(userId);
    }, [userId])

    return (
        <div className="Routing">
			<Routes>

                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<Home />} />
                <Route path="/tasks" element={<TaskList />} />
                <Route path="/new-task" element={<AddTask />} />
                <Route path="/about" element={<About />} />
                <Route path="/editTask/:taskId" element={<EditTask task={task} />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="*" element={<Page404 />} />
                
            </Routes>
        </div>
    );
}
