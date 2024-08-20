<<<<<<< HEAD
import { Task as TaskEntity } from 'src/modules/tasks/domain/entities/tasks.entity';
import { Task as TaskModel } from 'src/modules/tasks/domain/models/tasks.model';
import { DeepPartial } from 'typeorm';
=======
import { TaskEntity } from 'src/modules/tasks/domain/entities/tasks.entity';
import { TaskModel } from 'src/modules/tasks/domain/models/tasks.model';
import { DeepPartial } from 'typeorm';

>>>>>>> 8192f77 (refactory: docker end database connection)
export interface TasksRepository {
  create(task: TaskEntity): Promise<TaskModel>;
  update(id: string, task: Partial<TaskEntity>): Promise<DeepPartial<TaskModel>>;
  delete(id: string): Promise<void>;
  findOne(id: string): Promise<TaskModel>;
  findAll(): Promise<TaskModel[]>;
}
<<<<<<< HEAD
=======

export const USERS_REPOSITORY_TOKEN = 'users-repository-token';
>>>>>>> 8192f77 (refactory: docker end database connection)
