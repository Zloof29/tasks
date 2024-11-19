import { NavLink } from "react-router-dom";
import "./Menu.css";

export function Menu(): JSX.Element {
    return (
        
        <div className="Menu">

            <NavLink to="/home">Home</NavLink>
            <NavLink to="/products">Tasks</NavLink>
            <NavLink to="/new-product">Add Task</NavLink>
            <NavLink to="/about">About</NavLink>

        </div>
    );
}
