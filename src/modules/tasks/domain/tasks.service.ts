import { Inject, Injectable, Logger } from '@nestjs/common';

import { TasksRepository, USERS_REPOSITORY_TOKEN } from './repositories/implementations/tasks.repository.interface';
import { TaskModel } from './models/tasks.model';
import { CreateTasksDto } from '../http/dtos/create-tasks.dto';
import { TaskEntity } from './entities/tasks.entity';
import { UpdateTasksDto } from '../http/dtos/update-tasks.dto';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly tasksRepository: TasksRepository,
  ) {}

  async create(task: CreateTasksDto): Promise<TaskModel> {
    const taskCreated = await this.tasksRepository.create(task);

    this.logger.log(`create task ${taskCreated.id}`);
    return taskCreated;
  }
  async update(id: string, task: UpdateTasksDto): Promise<TaskModel> {
  

    const taskUpdated = await this.tasksRepository.update(id, task);

    this.logger.log(`update task ${taskUpdated.id}`);
    return taskUpdated;
   
  }

  async findLots(pagination?:Partial<{page:number, limit:number}>,title?:string): Promise<TaskModel[]> {
    return this.tasksRepository.findLots(pagination,title);
  }

  async findById(id: string): Promise<TaskModel> {

    
    return this.tasksRepository.findById(id);
  }



  async delete (id: string): Promise<void> {
    await this.tasksRepository.delete(id);
  }


  async deleteAll(): Promise<void> {
    await this.tasksRepository.deleteAll();
  }
}
