import { TaskEntity } from 'src/modules/tasks/domain/entities/tasks.entity';
import { TaskModel } from 'src/modules/tasks/domain/models/tasks.model';
import { DeepPartial } from 'typeorm';

export interface TasksRepository {
  create(task: TaskEntity): Promise<TaskModel>;
  update(id: string, task: Partial<TaskEntity>): Promise<DeepPartial<TaskModel>>;
  delete(id: string): Promise<void>;
  findOne(id: string): Promise<TaskModel>;
  findAll(): Promise<TaskModel[]>;
}

export const USERS_REPOSITORY_TOKEN = 'users-repository-token';
