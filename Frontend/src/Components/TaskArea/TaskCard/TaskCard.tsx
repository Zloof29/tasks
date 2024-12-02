import css from "./TaskCard.module.css";
import { TaskModel } from "../../../Models/TaskModel";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import { format } from "date-fns";
import { taskService } from "../../../Services/TaskService";
import { useSelector } from "react-redux";
import { AppState, store, taskActions } from "../../../Redux/store";
import { notify } from "../../../Utils/notify";
import { errorHandler } from "../../../Utils/ErrorHandler";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

type TaskCardProps = {
  task: TaskModel;
};

export function TaskCard(props: TaskCardProps): JSX.Element {
  const [showFullDescription, setShowFullDescription] =
    useState<boolean>(false);

  const handleToggleDescription = () => {
    setShowFullDescription(!showFullDescription);
  };

  const formatedDate = format(new Date(props.task.created), "dd/MM/yyyy");

  const taskId = useSelector<AppState, number | undefined>(
    (state) => state.tasks.find((t) => t.id === props.task.id)?.id
  );

  const navigate = useNavigate();

  const handleDeleteButton = async () => {
    try {
      await taskService.deleteTasks(taskId);
      notify.success("Task has been deleted.");
      const action = taskActions.deleteTasks(taskId);
      store.dispatch(action);
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  const handleEditButton = async () => {
    try {
      navigate(`/editTask/${taskId}`);
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  const handleToCompleteTask = async () => {
    try {
      const completed = "true";
      taskService.updateTaskCompleted(taskId, completed);
      notify.success("Task has been completed.");
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  return (
    <div className={css.Container}>
      <Card
        variant="outlined"
        sx={{
          width: 360,
          height: 250,
          backgroundColor: "transparent",
          m: 1,
          borderColor: "black",
          boxShadow: 5,
        }}
      >
        <Box sx={{ p: 2 }}>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
          >
            <Box sx={{ flexGrow: 1 }} />
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              sx={{ textAlign: "center", flexGrow: 1, marginRight: 2 }}
            >
              {props.task.title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{ textAlign: "right" }}
            >
              {formatedDate}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            sx={{
              color: "text.secondary",
              overflowX: "hidden",
              height: props.task.description.length > 80 ? "60px" : "20px",
              textOverflow:
                props.task.description.length > 80 ? "initial" : "ellipsis",
              overflowY:
                props.task.description.length > 80 ? "scroll" : "hidden",
              marginBottom: props.task.description.length < 80 ? "40px" : "0px",
              whiteSpace:
                props.task.description.length > 80 ? "normal" : "nowrap",
            }}
          >
            {props.task.description}
          </Typography>
          {/* {props.task.description.length > 80 && (
            <Button variant="text" onClick={handleToggleDescription}>
              {showFullDescription ? "Read less" : "Read more"}
            </Button>
          )} */}
        </Box>
        {/* <Divider />
        <Typography
          variant="body2"
          sx={{ color: props.task.completed === "true" ? "green" : "red" }}
        >
          {props.task.completed === "true" ? "Completed" : "Incomplete"}
        </Typography> */}
        <Divider />
        <Box sx={{ p: 2 }}>
          <Typography gutterBottom variant="body2">
            Select action:
          </Typography>
          <Stack direction="row" spacing={2} justifyContent={"center"}>
            <Button
              variant="text"
              sx={{ color: "red" }}
              onClick={handleDeleteButton}
            >
              Delete
            </Button>
            <Button variant="text" onClick={handleEditButton}>
              Edit
            </Button>
            {props.task.completed === "true" ? (
              <Button variant="text" onClick={handleEditButton} color="error">
                InComplete
              </Button>
            ) : (
              <Button
                variant="text"
                onClick={handleToCompleteTask}
                color="success"
              >
                Complete
              </Button>
            )}
          </Stack>
        </Box>
      </Card>
    </div>
  );
}
