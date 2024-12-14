import { configureStore, createSlice } from "@reduxjs/toolkit";
import {
  addTasks,
  deleteTasks,
  initTasks,
  initUser,
  logoutUser,
  updateTasks,
} from "./reducers";
import { UserModel } from "../Models/UserModel";
import { TaskModel } from "../Models/TaskModel";

export type AppState = {
  tasks: TaskModel[];
  user: UserModel;
};

const taskSlice = createSlice({
  name: "tasks",
  initialState: null,
  reducers: { initTasks, addTasks, updateTasks, deleteTasks },
});

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: { initUser, logoutUser },
});

export const taskActions = taskSlice.actions;
export const userActions = userSlice.actions;

export const store = configureStore<AppState>({
  reducer: {
    tasks: taskSlice.reducer,
    user: userSlice.reducer,
  },
});
