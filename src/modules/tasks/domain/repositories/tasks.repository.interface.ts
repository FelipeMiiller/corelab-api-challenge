import { Task as TaskEntity } from 'src/modules/tasks/domain/entities/tasks.entity';
import { Task as TaskModel } from 'src/modules/tasks/domain/models/tasks.model';
import { DeepPartial } from 'typeorm';
export interface TasksRepository {
  create(task: TaskEntity): Promise<TaskModel>;
  update(id: string, task: Partial<TaskEntity>): Promise<DeepPartial<TaskModel>>;
  delete(id: string): Promise<void>;
  findOne(id: string): Promise<TaskModel>;
  findAll(): Promise<TaskModel[]>;
}
