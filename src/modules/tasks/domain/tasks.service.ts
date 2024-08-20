/*
https://docs.nestjs.com/providers#services
*/

<<<<<<< HEAD
import { Inject, Injectable } from '@nestjs/common';
import { TasksRepository } from './repositories/tasks.repository.interface';
import { CreateTasksDto } from '../http/dtos/create-tasks.dto';
import { Task as TaskModel } from './models/tasks.model';

@Injectable()
export class TasksService {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly tasksRepository: TasksRepository,
  ) {}


 async create(task: CreateTasksDto): Promise<TaskModel> {

    return this.tasksRepository.create(task);


}}
=======
import { Inject, Injectable, Logger } from '@nestjs/common';

import { TasksRepository, USERS_REPOSITORY_TOKEN } from './repositories/tasks.repository.interface';
import { TaskModel } from './models/tasks.model';
import { CreateTasksDto } from '../http/dtos/create-tasks.dto';

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

  async findAll(): Promise<TaskModel[]> {
    return this.tasksRepository.findAll();
  }
}
>>>>>>> 8192f77 (refactory: docker end database connection)
