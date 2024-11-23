import axios from "axios";
import { TaskModel } from "../Models/TaskModel";
import { appConfig } from "../Utils/AppConfig";
import { store, taskActions } from "../Redux/store";

class TaskService {
    public async getAllTask(): Promise<TaskModel[]> {

        if (store.getState().tasks) return store.getState().tasks;

        const response = await axios.get<TaskModel[]>(appConfig.getTasks);
        
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

    public async addTask(userId: number, task: TaskModel): Promise<TaskModel> {
        const response = await axios.post(appConfig.addTask + userId, task);

        const addedTask = response.data;

        if(!store.getState().tasks) return;

        const action = taskActions.addTasks(addedTask);
        store.dispatch(action);

        return addedTask;
    }

    public async updateTask(id: number): Promise<TaskModel> {
        const response = await axios.put(appConfig.UpdateTask + id);

        const updatedTask = response.data;

        const action = taskActions.updateTasks(updatedTask);
        store.dispatch(action);

        return updatedTask;
    }

    public async deleteTasks(id: number): Promise<void> {
        await axios.delete<TaskModel>(appConfig.deleteTask + id);

        const action = taskActions.deleteTasks(id);
        store.dispatch(action);
    }
}

export const taskService = new TaskService();
