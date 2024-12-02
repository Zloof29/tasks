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
import { createSelector } from "reselect";

const selectIncompletedTasks = createSelector(
  (state: AppState) => state.tasks,
  (tasks) => (tasks ? tasks.filter((task) => task.completed === "false") : [])
);

export function TaskList(): JSX.Element {
  const incompletedTasks = useSelector(selectIncompletedTasks);

  const userId = useSelector<AppState, number>((state) => state.user.id);

  return (
    <div>
      {incompletedTasks.length > 0 ? (
        incompletedTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div>There is no Incompleted tasks.</div>
      )}
    </div>
  );
}
