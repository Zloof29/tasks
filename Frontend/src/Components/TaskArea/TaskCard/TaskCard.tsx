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
import { colors } from "@mui/material";

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
      const confirmed = window.confirm("Are you sure?");
      if (confirmed) {
        await taskService.deleteTasks(taskId);
        notify.success("Task has been deleted.");
        const action = taskActions.deleteTasks(taskId);
        store.dispatch(action);
      }
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
      navigate("/CompletedTasks");
    } catch (error: any) {
      notify.error(errorHandler.getError(error));
    }
  };

  const handleToIncompleteTask = async () => {
    try {
      const incomplete = "false";
      taskService.updateTaskIncomplete(taskId, incomplete);
      notify.success("Task has been Incomplete.");
      navigate("/IncompleteTasks");
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
          borderColor: "#292929",
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
              sx={{
                textAlign: "center",
                flexGrow: 1,
                marginRight: 2,
                color: "#E0E0E0",
              }}
            >
              {props.task.title}
            </Typography>
            <Typography
              gutterBottom
              variant="body2"
              component="div"
              sx={{ textAlign: "right", color: "#B0B0B0" }}
            >
              {formatedDate}
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            sx={{
              color: "#B0B0B0",
              overflowX: "hidden",
              overflowY: "hidden",
              height: showFullDescription
                ? "auto"
                : props.task.description.length > 80
                ? "60px"
                : "20px",
              textOverflow: showFullDescription
                ? "initial"
                : props.task.description.length > 80
                ? "initial"
                : "ellipsis",
              marginBottom: props.task.description.length < 80 ? "75px" : "0px",
              whiteSpace: showFullDescription
                ? "normal"
                : props.task.description.length > 80
                ? "normal"
                : "nowrap",
            }}
          >
            {props.task.description}
          </Typography>
          {props.task.description.length > 80 && (
            <Button
              variant="text"
              onClick={handleToggleDescription}
              sx={{ color: "#FFFFFF" }}
            >
              {showFullDescription ? "Read less" : "Read more"}
            </Button>
          )}
        </Box>
        {!showFullDescription ? (
          <>
            <Divider />
            <Box sx={{ p: 2 }}>
              <Typography
                gutterBottom
                variant="body2"
                sx={{ color: "#B0B0B0" }}
              >
                Select action:
              </Typography>
              <Stack direction="row" spacing={2} justifyContent={"center"}>
                <Button
                  variant="text"
                  color="error"
                  onClick={handleDeleteButton}
                >
                  Delete
                </Button>
                <Button
                  variant="text"
                  onClick={handleEditButton}
                  sx={{ color: "#FFFFFF" }}
                >
                  Edit
                </Button>
                {props.task.completed === "true" ? (
                  <Button
                    variant="text"
                    onClick={handleToIncompleteTask}
                    color="error"
                  >
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
          </>
        ) : (
          <></>
        )}
      </Card>
    </div>
  );
}
