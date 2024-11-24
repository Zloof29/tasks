import { OkPacketParams } from "mysql2";
import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-error";
import { TaskModel } from "../3-models/task-model";
import moment from "moment";

class TaskService {

    public async getAllTasks() {
        const sql = "SELECT * FROM tasks";

        const tasks = await dal.execute(sql);

        return tasks;
}

    public async getOneTask(id: number) {
        const sql = "SELECT * FROM tasks WHERE id = ?";

        const tasks = await dal.execute(sql, [id]);

        const task = tasks[0];

        if (!task) throw new ResourceNotFoundError(id);

        return task;
    }

    public async addTask(task: TaskModel, userId): Promise<TaskModel> {
        const sql = "INSERT INTO tasks(title, description, created, userId) VALUES(?, ?, ?, ?)";

        const created = moment(task.created).format('YYYY-MM-DD HH:mm:ss');

        const values = [
            task.title,
            task.description,
            created,
            userId
        ]

        const info: OkPacketParams = await dal.execute(sql, values);

        task = await this.getOneTask(info.insertId);

        return task;
    }

    public async updateTask(task: TaskModel): Promise<TaskModel> {
        const sql = "UPDATE tasks set title = ?, description = ? WHERE id = ?";

        const values = [
            task.title,
            task.description,
            task.id
        ];

        const info: OkPacketParams = await dal.execute(sql, values);

        task = await this.getOneTask(task.id);

        if (info.affectedRows === 0) throw new ResourceNotFoundError(task.id);

        return task;
    }

    public async deleteTask(id: number): Promise<void> {
        const sql = "DELETE FROM tasks WHERE id = ?";

        const info: OkPacketParams = await dal.execute(sql, [id]);

        if (info.affectedRows === 0) throw new ResourceNotFoundError(id);

        return;
    }
}

export const taskService = new TaskService();
