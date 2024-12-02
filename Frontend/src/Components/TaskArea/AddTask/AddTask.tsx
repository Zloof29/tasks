import { useNavigate } from "react-router-dom";
import { TaskModel } from "../../../Models/TaskModel";
import { taskService } from "../../../Services/TaskService";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { notify } from "../../../Utils/notify";
import css from "./AddTask.module.css";
import { useForm } from "react-hook-form";
import TextField from "@mui/material/TextField";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { Box, Stack, Button } from "@mui/material";

export function AddTask(): JSX.Element {
  const { register, handleSubmit, setValue } = useForm<TaskModel>();

  const navigate = useNavigate();

  const userId = useSelector<AppState, number>((state) => state.user.id);

  useEffect(() => {
    setValue("created", new Date().toISOString());
    setValue("completed", "false");
  }, [setValue]);

  async function send(task: TaskModel) {
    try {
      await taskService.addTask(task, userId);
      notify.success("Task has been added.");
      navigate("/tasks");
    } catch (error) {
      notify.error(errorHandler.getError(error));
    }
  }

  function handleCancelButton() {
    try {
      navigate("/tasks");
    } catch (error: any) {
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

        <Box display={"flex"} justifyContent={"center"}>
          <Stack direction="row" spacing={2} justifyContent={"center"}>
            <Button type="submit">ADD</Button>
            <Button onClick={handleCancelButton}>Cancel</Button>
          </Stack>
        </Box>
      </form>
    </div>
  );
}
