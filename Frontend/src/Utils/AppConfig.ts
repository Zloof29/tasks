class AppConfig {
  public readonly productsUrl = "http://localhost:4000/api/products/";
  public readonly registerUrl = "http://localhost:4000/api/register/";
  public readonly loginUrl = "http://localhost:4000/api/login/";
  public readonly getTasks = "http://localhost:4000/api/tasks/";
  public readonly getTask = "http://localhost:4000/api/tasks/";
  public readonly addTask = "http://localhost:4000/api/tasks/";
  public readonly UpdateTask = "http://localhost:4000/api/tasks/";
  public readonly UpdateTaskToComplete = "http://localhost:4000/api/tasks/";
  public readonly deleteTask = "http://localhost:4000/api/tasks/";
}

export const appConfig = new AppConfig();
