import { NavLink } from "react-router-dom";
import css from "./Menu.module.css";

export function Menu(): JSX.Element {
    return (
        
        <div className={css.Menu}>

            <NavLink to="/tasks" className={({isActive}) => isActive ? css.active : undefined}>Tasks</NavLink>
            <NavLink to="/new-task" className={({isActive}) => isActive ? css.active : undefined}>Add Task</NavLink>

        </div>
    );
}
