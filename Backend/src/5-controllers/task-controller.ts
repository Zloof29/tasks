import express, { Request, Response, NextFunction } from "express";
import { taskService } from "../4-services/task-service";
import { TaskModel } from "../3-models/task-model";
import { StatusCode } from "../3-models/enums";

class TaskController {

    public readonly router = express.Router();

    public constructor() {
        this.router.get("/tasks", this.getAllTasks);
        this.router.get("/tasks/:id([0-9]+)", this.getOneTask);
        this.router.post("/tasks", this.addTask);
        this.router.put("/tasks/:id([0-9]+)", this.updateTask);
        this.router.delete("/tasks/:id([0-9]+)", this.deleteTask);
    }

    private async getAllTasks(request: Request, response: Response, next: NextFunction) {
        try {
            const tasks = await taskService.getAllTasks();
            response.json(tasks);
        } catch (error: any) {
            next(error);
        }
    }

    private async getOneTask(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id;
            const task = await taskService.getOneTask(id);
            response.json(task);
        } catch (error: any) {
            next(error);
        }
    }

    private async addTask(request: Request, response: Response, next: NextFunction) {
        try {
            const task = new TaskModel(request.body);
            const addedTask = await taskService.addTask(task);
            response.status(StatusCode.Created).json(addedTask);
        } catch (error: any) {
            next(error);
        }
    }

    private async updateTask(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id;
            request.body.id = id;
            const task = new TaskModel(request.body);
            const updatedTask = await taskService.updateTask(task);
            response.json(updatedTask);
        } catch (error: any) {
            next(error);
        }
    }

    private async deleteTask(request: Request, response: Response, next: NextFunction) {
        try {
            const id = +request.params.id;
            await taskService.deleteTask(id);
            response.status(StatusCode.NoContent);
        } catch (error: any) {
            next(error);
        }
    }
}

export const taskController = new TaskController();
