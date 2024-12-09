import { Navigate, Route, Routes } from "react-router-dom";
import "./Routing.css";
import { Home } from "../../HomeArea/Home/Home";
import { Page404 } from "../Page404/Page404";
import { Register } from "../../UserArea/Register/Register";
import { Login } from "../../UserArea/Login/Login";
import { IncompleteTasks } from "../../TaskArea/IncompleteTasks/IncompleteTasks";
import { AddTask } from "../../TaskArea/AddTask/AddTask";
import { EditTask } from "../../TaskArea/EditTask/EditTask";
import { CompletedTasks } from "../../TaskArea/CompletedTasks/CompletedTasks";

export function Routing(): JSX.Element {
  return (
    <div className="Routing">
      <Routes>
        <Route path="/" element={<IncompleteTasks />} />
        <Route path="/IncompleteTasks" element={<IncompleteTasks />} />
        <Route path="/completedTasks" element={<CompletedTasks />} />
        <Route path="/new-task" element={<AddTask />} />
        <Route path="/editTask/:taskId" element={<EditTask />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Page404 />} />
      </Routes>
    </div>
  );
}
