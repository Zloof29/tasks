import { useNavigate } from "react-router-dom";
import { TaskModel } from "../../../Models/TaskModel";
import { taskService } from "../../../Services/TaskService";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { notify } from "../../../Utils/notify";
import css from "./AddTask.module.css";
import { useForm } from "react-hook-form";
import TextField from '@mui/material/TextField';
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";

export function AddTask(): JSX.Element {

    const {register, handleSubmit, setValue} = useForm<TaskModel>();

    const navigate = useNavigate();

    const userId = useSelector<AppState, number>((state) => state.user.id);

    useEffect(() => {
        // Set the current date and time when the component mounts
        setValue('created', new Date().toISOString());
      }, [setValue]);

    async function send(task: TaskModel) {
        try {
            await taskService.addTask(userId, task);
            notify.success("Task has been added.");
            navigate("/tasks");
          } catch (error) {
          console.log(userId);
            notify.error(errorHandler.getError(error));
        }
    }

    return (
        <div>

        <form onSubmit={handleSubmit(send)} className={css.form}>

        <TextField 
          className={css.TextField}
          required
          id="outlined-required"
          label="Title"
          {...register("title")}
        />

        <TextField
          className={css.TextField}
          required
          id="outlined-required"
          label="Description"
          {...register("description")}
        />

        <input type="hidden" {...register("created")} />

        <button className={css.Button}>ADD</button>

        </form>

        </div>
    );
}

