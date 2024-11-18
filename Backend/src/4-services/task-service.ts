import { dal } from "../2-utils/dal";
import { ResourceNotFoundError } from "../3-models/client-error";

class TaskService {

    public async getAllTasks() {
        const sql = "SELECT * FROM tasks";

        const tasks = await dal.execute(sql);

        return tasks;
}

    public async getOneTask(id: number) {
        const sql = "SELECT * FROM task WHERE = id = ?";

        const tasks = await dal.execute(sql, [id]);

        const task = tasks[0];

        if (!task) throw new ResourceNotFoundError(id);
        
        return task;
    }
}

export const taskService = new TaskService();
