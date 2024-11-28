import { useForm } from "react-hook-form";
import css from "./EditTask.module.css";
import { TaskModel } from "../../../Models/TaskModel";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { taskService } from "../../../Services/TaskService";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { useEffect } from "react";

type EditTaskProps = {
    task: TaskModel;
}

export function EditTask(props: EditTaskProps): JSX.Element {
    const {register, handleSubmit, reset} = useForm<TaskModel>();

    const navigate = useNavigate();

    const {taskId} = useParams();

    // const taskId = useSelector<AppState, number>((state) => state.tasks.find((t) => t.id === props.task.id)?.id); 

    async function send(task: TaskModel) {
        try {
            await taskService.updateTask(+taskId, task);
            notify.success("Task has been edited.");
            navigate("/tasks");
        } catch (error: any) {
            console.log(+taskId);
            
            notify.error(errorHandler.getError(error));
        }
    }

    function handleResetButton() {
        try {
            reset();
        } catch (error: any) {
            notify.error(errorHandler.getError(error));
        }
    }

    return (
        <div className={css.editTask}>
            <form onSubmit={handleSubmit(send)}>

                <label>Title: </label>
                <input type="text" {...register("title")} required />

                <label>Description: </label>
                <input type="text" {...register("description")} required />

                <button type="submit">Update</button>
                <button type="button" onClick={handleResetButton}>Clear</button>

            </form>
        </div>
    );
}
