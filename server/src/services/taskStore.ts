import { Task, CreateTaskInput } from '../types';


class TaskStore {
  private tasks: Task[] = [];
  private nextId: number = 1;


  getAll(): Task[] {
    return this.tasks;
  }
  getById(id: string): Task | undefined {
    return this.tasks.find(task => task.id === id);
  }

  create(taskData: CreateTaskInput): Task {
    const newTask: Task = {
      ...taskData,
      id: String(this.nextId)
    };
    this.nextId++;
    this.tasks.push(newTask);
    return newTask;
  }

  delete(id: string): boolean {
    const initialLength = this.tasks.length;
    this.tasks = this.tasks.filter(task => task.id !== id);
    return this.tasks.length !== initialLength;
  }

}
export const taskStore = new TaskStore();