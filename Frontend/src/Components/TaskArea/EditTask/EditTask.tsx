import { useForm } from "react-hook-form";
import css from "./EditTask.module.css";
import { TaskModel } from "../../../Models/TaskModel";
import { useNavigate, useParams } from "react-router-dom";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { taskService } from "../../../Services/TaskService";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { Box, Button, ButtonGroup, Stack } from "@mui/material";

export function EditTask(): JSX.Element {
    const {register, handleSubmit, reset, setValue} = useForm<TaskModel>();

    const navigate = useNavigate();

    const {taskId} = useParams();

    const task = useSelector<AppState, TaskModel | undefined>((state) =>
        state.tasks ? state.tasks.find((t) => t.id === +taskId) : undefined
    );

    useEffect(() => {
        if (task) {
            setValue("title", task.title);
            setValue("description", task.description);
        }
    }, [task, setValue])

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

    function handleCancelButton () {
        try {
            navigate("/tasks");
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

                <Box display={"flex"} justifyContent={"center"}>
                <Stack direction="row" spacing={2} justifyContent={"center"}>
                <Button type="submit">Update</Button>
                <Button type="button" onClick={handleResetButton}>Clear</Button>
                <Button type="button" onClick={handleCancelButton}>cancel</Button>
                </Stack>

                </Box>

            </form>
        </div>
    );
}