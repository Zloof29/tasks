import { useSelector } from "react-redux";
import css from "./CompletedTask.module.css";
import { AppState } from "../../../Redux/store";
import { TaskCard } from "../TaskCard/TaskCard";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { taskService } from "../../../Services/TaskService";

// Memoized selector
const selectCompletedTasks = createSelector(
  (state: AppState) => state.tasks,
  (tasks) => (tasks ? tasks.filter((task) => task.completed === "true") : [])
);

export function CompletedTask(): JSX.Element {
  const completedTasks = useSelector(selectCompletedTasks);

  const userId = useSelector<AppState, number>((state) => state.user.id);

  useEffect(() => {
    taskService.getAllTask(userId);
  }, [userId]);

  return (
    <div className={css.CompletedTask}>
      {completedTasks.length > 0 ? (
        completedTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div>There is no completed tasks.</div>
      )}
    </div>
  );
}
