import { DeepPartial } from 'typeorm';
import { TaskEntity } from '../../entities/tasks.entity';
import { TaskModel } from '../../models/tasks.model';
import { TasksRepository } from '../tasks.repository.interface';

export class TasksInMemoryRepository implements TasksRepository {
  private tasks: TaskModel[] = [];

  async create(task: TaskEntity): Promise<TaskModel> {
    const taskCreated = new TaskModel(task);
    this.tasks.push(taskCreated);
    return taskCreated;
  }

  async findAll() {
    return this.tasks;
  }

  async update(id: string, task: Partial<TaskEntity>): Promise<DeepPartial<TaskModel>> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    this.tasks[index] = {
      ...this.tasks[index],
      ...task,
    };
    return this.tasks[index];
  }

  delete(id: string): Promise<void> {
    const index = this.tasks.findIndex((task) => task.id === id);
    if (index === -1) {
      throw new Error('Task not found');
    }
    this.tasks.splice(index, 1);
    return Promise.resolve();
  }
  async findOne(id: string): Promise<TaskModel> {
    return this.tasks.find((task) => task.id === id);
  }
}
