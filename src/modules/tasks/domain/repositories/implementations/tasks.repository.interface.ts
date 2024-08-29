import { TaskEntity } from 'src/modules/tasks/domain/entities/tasks.entity';
import { TaskModel } from 'src/modules/tasks/domain/models/tasks.model';





export interface TasksRepository {
  create(task: TaskEntity): Promise<TaskModel>;
  update(id: string, task: Partial<TaskEntity>): Promise<TaskModel>;
  delete(id: string): Promise<void>;
  deleteAll(): Promise<void>;
  findById(id: string): Promise<TaskModel>;
  findLots(pagination?:Partial<{page:number, limit:number}>,title?:string): Promise<TaskModel[]>;
 
}

export const USERS_REPOSITORY_TOKEN = 'users-repository-token';
