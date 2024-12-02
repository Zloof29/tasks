import { NavLink } from "react-router-dom";
import css from "./Menu.module.css";

export function Menu(): JSX.Element {
  return (
    <div className={css.Menu}>
      <NavLink
        to="/IncompleteTasks"
        className={({ isActive }) => (isActive ? css.active : undefined)}
      >
        Incomplete Tasks
      </NavLink>
      <NavLink
        to="/CompletedTasks"
        className={({ isActive }) => (isActive ? css.active : undefined)}
      >
        Completed Tasks
      </NavLink>
      <NavLink
        to="/new-task"
        className={({ isActive }) => (isActive ? css.active : undefined)}
      >
        Add Task
      </NavLink>
    </div>
  );
}
