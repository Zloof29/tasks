import { NavLink } from "react-router-dom";
import css from "./Menu.module.css";
import * as React from "react";
import Button from "@mui/material/Button";
import ButtonGroup from "@mui/material/ButtonGroup";
import Box from "@mui/material/Box";

export function Menu(): JSX.Element {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: "#3498db",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup variant="outlined" aria-label="Basic button group">
        <Button>
          <NavLink
            to="/IncompleteTasks"
            className={({ isActive }) => (isActive ? css.active : undefined)}
          >
            Incomplete Tasks
          </NavLink>
        </Button>
        <Button>
          <NavLink
            to="/CompletedTasks"
            className={({ isActive }) => (isActive ? css.active : undefined)}
          >
            Completed Tasks
          </NavLink>
        </Button>
        <Button>
          <NavLink
            to="/new-task"
            className={({ isActive }) => (isActive ? css.active : undefined)}
          >
            Add Task
          </NavLink>
        </Button>
      </ButtonGroup>
    </Box>
  );
}
