/*
https://docs.nestjs.com/controllers#controllers
*/

import { Body, Controller, Delete, Get, Optional, Param, Patch, Post, Query } from '@nestjs/common';
import { TasksService } from '../domain/tasks.service';
import { CreateTasksDto } from './dtos/create-tasks.dto';
import { ApiBody, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateTasksDto } from './dtos/update-tasks.dto';

@ApiTags('Tasks')
@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Post()
  @ApiBody({ type: CreateTasksDto })
  async create(@Body() taskDto: CreateTasksDto) {
    return this.tasksService.create(taskDto);
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    return this.tasksService.findById(id);
  }

  @Get()
  @ApiQuery({ name: 'page', required: false, type: Number, example: 1 })
  @ApiQuery({ name: 'limit', required: false, type: Number, example: 10 })
  @ApiQuery({ name: 'title', required: false, type: String })
  async findMany(@Query('page') page = 1, @Query('limit') limit = 10, @Query('title') title?: string) {
    return this.tasksService.findMany({ page, limit }, title);
  }

  @Patch(':id')
  @ApiBody({ type: UpdateTasksDto })
  async update(@Param('id') id: string, @Body() taskUpdateDto: UpdateTasksDto) {
    
    return this.tasksService.update(id, taskUpdateDto);
  }

  @Delete(':id')
  async delete(@Param('id') id: string) {
    return this.tasksService.delete(id);
  }
}
