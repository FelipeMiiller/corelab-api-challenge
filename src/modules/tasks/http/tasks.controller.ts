/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Get, Post } from '@nestjs/common';
import { TasksService } from '../domain/tasks.service';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  async create(@Body() taskDto: CreateTasksDto) {
    return this.tasksService.create(taskDto);
  }

  @Get()
  async findAll() {
    return this.tasksService.findAll();
  }
}
