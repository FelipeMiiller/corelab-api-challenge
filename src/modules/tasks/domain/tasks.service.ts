import { Inject, Injectable } from '@nestjs/common';

import { TasksRepository, USERS_REPOSITORY_TOKEN } from './repositories/implementations/tasks.repository.interface';
import { TaskModel } from './models/tasks.model';
import { CreateTasksDto } from '../http/dtos/create-tasks.dto';
import { UpdateTasksDto } from '../http/dtos/update-tasks.dto';
import { LoggerService } from 'src/common/loggers/logger.service';

@Injectable()
export class TasksService {
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly tasksRepository: TasksRepository,
    private readonly loggerService: LoggerService,
  ) {
    this.loggerService.contextName = TasksService.name;
  }

  async create(task: CreateTasksDto): Promise<TaskModel> {
    try {
      const taskCreated = await this.tasksRepository.create(task);

      this.loggerService.info(`create task ${taskCreated.id}`);
      return taskCreated;
    } catch (error) {
      this.loggerService.error(`Error creating task ${task.title}`, error);
      throw error;
    }
  }
  async update(id: string, task: UpdateTasksDto): Promise<TaskModel> {
    try {
      const taskUpdated = await this.tasksRepository.update(id, task);

      this.loggerService.info(`update task ${taskUpdated.id}`);
      return taskUpdated;
    } catch (error) {
      this.loggerService.error(`Error updating task ${task.title}`, error);
      throw error;
    }
  }

  async findMany(pagination?: Partial<{ page: number; limit: number }>, title?: string): Promise<TaskModel[]> {
    try {
      return this.tasksRepository.findMany(pagination, title);
    } catch (error) {
      this.loggerService.error(`Error finding tasks ${title}`, error);
      throw error;
    }
  }

  async findById(id: string): Promise<TaskModel> {
    try {
      return this.tasksRepository.findById(id);
    } catch (error) {
      this.loggerService.error(`Error finding task ${id}`, error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      await this.tasksRepository.delete(id);
    } catch (error) {
      this.loggerService.error(`Error deleting task ${id}`, error);
      throw error;
    }
  }

  async deleteAll(): Promise<void> {
    await this.tasksRepository.deleteAll();
  }
}
