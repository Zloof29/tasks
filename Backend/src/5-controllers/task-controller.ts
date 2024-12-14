import express, { Request, Response, NextFunction } from "express";
import { taskService } from "../4-services/task-service";
import { TaskModel } from "../3-models/task-model";
import { StatusCode } from "../3-models/enums";
import { securityMiddleware } from "../6-middleware/security-middleware";

class TaskController {
  public readonly router = express.Router();

  public constructor() {
    this.router.get(
      "/tasks/:userId([0-9]+)",
      securityMiddleware.validateLogin,
      this.getAllTasks
    );
    this.router.get(
      "/tasks/:id([0-9]+)",
      securityMiddleware.validateLogin,
      this.getOneTask
    );
    this.router.post(
      "/tasks/:userId",
      securityMiddleware.validateLogin,
      this.addTask
    );
    this.router.put(
      "/tasks/:id([0-9]+)",
      securityMiddleware.validateLogin,
      this.updateTask
    );
    this.router.put(
      "/tasks/:id([0-9]+)/complete",
      securityMiddleware.validateLogin,
      this.updateToCompleteTask
    );
    this.router.put(
      "/tasks/:id([0-9]+)/incomplete",
      securityMiddleware.validateLogin,
      this.updateToIncompleteTask
    );
    this.router.delete(
      "/tasks/:id([0-9]+)",
      securityMiddleware.validateLogin,
      this.deleteTask
    );
  }

  private async getAllTasks(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = +request.params.userId;
      const tasks = await taskService.getAllTasks(userId);
      response.json(tasks);
    } catch (error: any) {
      next(error);
    }
  }

  private async getOneTask(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      const task = await taskService.getOneTask(id);
      response.json(task);
    } catch (error: any) {
      next(error);
    }
  }

  private async addTask(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const userId = request.params.userId;
      request.body.userId = userId;
      const task = new TaskModel(request.body);
      const addedTask = await taskService.addTask(task, userId);
      response.status(StatusCode.Created).json(addedTask);
    } catch (error: any) {
      next(error);
    }
  }

  private async updateTask(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
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

  private async updateToCompleteTask(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      const completed = request.body.completed;
      const updatedTask = await taskService.updateTaskCompleted(id, completed);
      response.json(updatedTask);
    } catch (error: any) {
      next(error);
    }
  }

  private async updateToIncompleteTask(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      const incomplete = request.body.completed;
      const updatedTask = await taskService.updateTaskIncomplete(
        id,
        incomplete
      );
      response.json(updatedTask);
    } catch (error: any) {
      next(error);
    }
  }

  private async deleteTask(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const id = +request.params.id;
      await taskService.deleteTask(id);
      response.status(StatusCode.NoContent).send();
    } catch (error: any) {
      next(error);
    }
  }
}

export const taskController = new TaskController();
