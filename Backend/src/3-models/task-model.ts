export class TaskModel {
    public id: number;
    public title: string;
    public description: string;
    public created: Date;
    public userId: number;

    constructor(task: TaskModel) {
        this.id = task.id;
        this.title = task.title;
        this.description = task.description;
        this.created = task.created;
        this.userId = task.userId;
    }
}