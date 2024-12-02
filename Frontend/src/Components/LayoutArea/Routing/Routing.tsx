import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../HomeArea/Home/Home";
import { Page404 } from "../Page404/Page404";
import { Register } from "../../UserArea/Register/Register";
import { Login } from "../../UserArea/Login/Login";
import { TaskList } from "../../TaskArea/TaskList/TaskList";
import { AddTask } from "../../TaskArea/AddTask/AddTask";
import { EditTask } from "../../TaskArea/EditTask/EditTask";
import { CompletedTask } from "../../TaskArea/CompletedTask/CompletedTask";

export function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route path="/IncompleteTasks" element={<TaskList />} />
        <Route path="/home" element={<Home />} />
        <Route path="/completedTasks" element={<CompletedTask />} />
        <Route path="/new-task" element={<AddTask />} />
        <Route path="/editTask/:taskId" element={<EditTask />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
