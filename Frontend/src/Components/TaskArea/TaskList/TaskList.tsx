import { useEffect, useState } from "react";
import css from "./TaskList.module.css";
import { taskService } from "../../../Services/TaskService";
import { TaskModel } from "../../../Models/TaskModel";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { TaskCard } from "../TaskCard/TaskCard";
import { useSelector } from "react-redux";
import { AppState, taskActions } from "../../../Redux/store";
import { useDispatch } from "react-redux";

export function TaskList(): JSX.Element {

    const tasks = useSelector<AppState, TaskModel[]>(state => state.tasks) || [];

    const userId = useSelector<AppState, number>((state) => state.user.id);

    const dispatch = useDispatch();

    useEffect(() => {
        taskService.getAllTask(userId)
        .then(response => {
            const action = taskActions.initTasks(response);
            dispatch(action);
        })
        .catch(error => notify.error(errorHandler.getError(error)));
    }, [userId, dispatch]);

    return (
        <div>
            {tasks.map(t => <TaskCard key={t.id} task={t} />)}
        </div>
    )
}
