import { useEffect, useState } from "react";
import css from "./TaskList.module.css";
import { taskService } from "../../../Services/TaskService";
import { TaskModel } from "../../../Models/TaskModel";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { TaskCard } from "../TaskCard/TaskCard";

export function TaskList(): JSX.Element {

    const [tasks, setTask] = useState<TaskModel[]>([]);

    useEffect(() => {
        taskService.getAllTask()
        .then(tasks => setTask(tasks))
        .catch(error => notify.error(errorHandler.getError(error)));
    }, [])

    return (
        <div>
            {tasks.map(t => <TaskCard key={t.id} task={t} />)}
        </div>
    )
}
