import { Action, PayloadAction } from "@reduxjs/toolkit";
import { UserModel } from "../Models/UserModel";
import { TaskModel } from "../Models/TaskModel";

// npm i react-redux @types/react-redux @reduxjs/toolkit

export function initTasks(currentState: TaskModel[], action: PayloadAction<TaskModel[]>) {
    const newState: TaskModel[] = action.payload;
    return newState;
}

export function addTasks(currentState: TaskModel[], action: PayloadAction<TaskModel>) {
    const newState: TaskModel[] = [...currentState];
    newState.push(action.payload);
    return newState;
}

export function updateTasks(currentState: TaskModel[], action: PayloadAction<TaskModel>) {
    const updatedTask = action.payload;
    const newState = currentState.map(task => task.id === updatedTask.id ? updatedTask : task);
    return newState;
}

export function deleteTasks(currentState: TaskModel[], action: PayloadAction<number>) {
    const newState = currentState.filter((task) => task.id !== action.payload);
    return newState;
}


export function initUser(currentState: UserModel, action: PayloadAction<UserModel>) {
    const newState: UserModel = action.payload;
    return newState;
}

export function logoutUser(currentState: UserModel, action: Action) {
    const newState: UserModel = null;
    return newState;
}
