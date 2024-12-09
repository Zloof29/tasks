import { TaskCard } from "../TaskCard/TaskCard";
import { useSelector } from "react-redux";
import { AppState } from "../../../Redux/store";
import { createSelector } from "reselect";
import { useEffect } from "react";
import { taskService } from "../../../Services/TaskService";
import { useNavigate } from "react-router-dom";

const selectIncompleteTasks = createSelector(
  (state: AppState) => state.tasks,
  (tasks) => (tasks ? tasks.filter((task) => task.completed === "false") : [])
);

export function TaskList(): JSX.Element {
  const incompleteTasks = useSelector(selectIncompleteTasks);

  const navigate = useNavigate();

  const userId = useSelector<AppState, number | null>(
    (state) => state.user?.id ?? null
  );

  useEffect(() => {
    if (userId === null) {
      navigate("/page404");
    } else {
      taskService.getAllTask(userId);
    }
  }, [userId, navigate]);

  return (
    <div>
      {incompleteTasks.length > 0 ? (
        incompleteTasks.map((task) => <TaskCard key={task.id} task={task} />)
      ) : (
        <div>There is no incomplete tasks.</div>
      )}
    </div>
  );
}
