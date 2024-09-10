/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { TasksController } from './http/tasks.controller';
import { TasksService } from './domain/tasks.service';
import { provideTasksRepository } from './domain/repositories/tasks.repository.provider';
import { TaskModel } from './domain/models/tasks.model';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerModule } from 'src/common/loggers/logger.module';

@Module({
  imports: [LoggerModule, TypeOrmModule.forFeature([TaskModel])],
  controllers: [TasksController],
  providers: [TasksService, ...provideTasksRepository(), TypeOrmModule],
})
export class TasksModule {}
