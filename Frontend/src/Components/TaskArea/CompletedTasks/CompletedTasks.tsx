import { useSelector } from "react-redux";
import css from "./CompletedTasks.module.css";
import { AppState } from "../../../Redux/store";
import { TaskCard } from "../TaskCard/TaskCard";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { taskService } from "../../../Services/TaskService";
import { useNavigate } from "react-router-dom";

// Memoized selector
const selectCompletedTasks = createSelector(
  (state: AppState) => state.tasks,
  (tasks) => (tasks ? tasks.filter((task) => task.completed === "true") : [])
);

export function CompletedTasks(): JSX.Element {
  const completedTasks = useSelector(selectCompletedTasks);

  const navigate = useNavigate();

  const userId = useSelector<AppState, number | null>(
    (state) => state.user?.id ?? null
  );

  useEffect(() => {
    if (userId === null) {
      navigate("/logIn");
    } else {
      taskService.getAllTask(userId);
    }
  }, [userId, navigate]);

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
