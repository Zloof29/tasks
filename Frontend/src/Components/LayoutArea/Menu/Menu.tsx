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
        color: "#FFFFFF",
        backgroundColor: "#1F1F1F",
        "& > *": {
          m: 1,
        },
      }}
    >
      <ButtonGroup
        variant="outlined"
        aria-label="Basic button group"
        sx={{
          "& .MuiButtonGroup-grouped": {
            borderColor: "#292929", // Border color for the button group
            color: "#FFFFFF", // Text color
            "&:hover": {
              borderColor: "#292929", // Border color on hover
              backgroundColor: "#333333", // Background color on hover
            },
          },
        }}
      >
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
