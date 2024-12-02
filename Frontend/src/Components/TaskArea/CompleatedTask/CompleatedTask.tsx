import { useSelector } from "react-redux";
import css from "./CompleatedTask.module.css";
import { AppState } from "../../../Redux/store";
import { TaskCard } from "../TaskCard/TaskCard";
import { createSelector } from "reselect";

// Memoized selector
const selectCompletedTasks = createSelector(
  (state: AppState) => state.tasks,
  (tasks) => (tasks ? tasks.filter((task) => task.completed === "true") : [])
);

export function CompleatedTask(): JSX.Element {

    const completedTasks = useSelector(selectCompletedTasks);

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
