import { TaskCard } from "../TaskCard/TaskCard";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { taskService } from "../../../Services/TaskService";

const selectIncompleteTasks = createSelector(
  (state: AppState) => state.tasks,
  (tasks) => (tasks ? tasks.filter((task) => task.completed === "false") : [])
);

export function TaskList(): JSX.Element {
  const incompleteTasks = useSelector(selectIncompleteTasks);

  const userId = useSelector<AppState, number>((state) => state.user.id);

  useEffect(() => {
    taskService.getAllTask(userId);
  }, [userId]);

  return (
    <div>
      {incompleteTasks.length > 0 ? (
        incompleteTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div>There is no incompleteTasks tasks.</div>
      )}
    </div>
  );
}
