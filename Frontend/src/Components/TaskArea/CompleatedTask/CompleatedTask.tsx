import { useSelector } from "react-redux";
import css from "./CompleatedTask.module.css";
import { AppState } from "../../../Redux/store";
import { TaskModel } from "../../../Models/TaskModel";
import { useEffect } from "react";
import { taskService } from "../../../Services/TaskService";
import { TaskCard } from "../TaskCard/TaskCard";

export function CompleatedTask(): JSX.Element {
  const completedTasks = useSelector<AppState, TaskModel[]>((state) =>
    state.tasks ? state.tasks.filter((task) => task.completed === "true") : []
  );

  return (
    <div className={css.CompleatedTas}>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div>There is no completed tasks.</div>
      )}
    </div>
  );
}
