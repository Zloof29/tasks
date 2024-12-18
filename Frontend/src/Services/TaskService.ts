import axios from "axios";
import { TaskModel } from "../Models/TaskModel";
import { appConfig } from "../Utils/AppConfig";
import { store, taskActions } from "../Redux/store";

class TaskService {
  public async getAllTask(userId: number): Promise<TaskModel[]> {
    const response = await axios.get<TaskModel[]>(appConfig.getTasks + userId);

    const tasks = response.data;

    const action = taskActions.initTasks(tasks);
    store.dispatch(action);

    return tasks;
  }

  public async getOneTask(id: number): Promise<TaskModel> {
    const response = await axios.get<TaskModel>(appConfig.getTask + id);

    const task = response.data;

    const action = taskActions.updateTasks(task);
    store.dispatch(action);

    return task;
  }

  public async addTask(task: TaskModel, userId: number): Promise<TaskModel> {
    const response = await axios.post(appConfig.addTask + userId, task);

    const addedTask = response.data;

    if (!store.getState().tasks) return;

    const action = taskActions.addTasks(addedTask);
    store.dispatch(action);

    return addedTask;
  }

  public async updateTask(id: number, task: TaskModel): Promise<TaskModel> {
    const response = await axios.put(appConfig.UpdateTask + id, task);

    const updatedTask = response.data;

    const action = taskActions.updateTasks(updatedTask);
    store.dispatch(action);

    return updatedTask;
  }

  public async updateTaskCompleted(
    id: number,
    completed: string
  ): Promise<TaskModel> {
    const response = await axios.put(
      `${appConfig.UpdateTaskToComplete}${id}/complete`,
      { completed }
    );

    const updatedCompleted = response.data;

    const action = taskActions.updateTasks(updatedCompleted);
    store.dispatch(action);

    return updatedCompleted;
  }

  public async updateTaskIncomplete(
    id: number,
    incomplete: string
  ): Promise<TaskModel> {
    const completed = incomplete === "false" ? "false" : "true";

    const response = await axios.put(
      `${appConfig.UpdateTaskToIncomplete}${id}/incomplete`,
      { incomplete, completed }
    );

    const updatedIncomplete = response.data;

    const action = taskActions.updateTasks(updatedIncomplete);
    store.dispatch(action);

    return updatedIncomplete;
  }

  public async deleteTasks(id: number): Promise<void> {
    await axios.delete<TaskModel>(appConfig.deleteTask + id);

    const action = taskActions.deleteTasks(id);
    store.dispatch(action);
  }
}

export const taskService = new TaskService();
