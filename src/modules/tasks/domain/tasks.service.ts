/*
https://docs.nestjs.com/providers#services
*/

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
