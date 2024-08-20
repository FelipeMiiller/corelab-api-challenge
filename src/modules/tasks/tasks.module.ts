<<<<<<< HEAD
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/common/infra/database/database.module';
import { TasksController } from './http/tasks.controller';
import { TasksService } from './domain/tasks.service';
import { provideTasksRepository } from './domain/repositories/tasks.repository.provider';

@Module({
    imports: [DatabaseModule],
    controllers: [TasksController],
    providers: [TasksService,...provideTasksRepository],
})
export class TasksModule {}
=======
/*
https://docs.nestjs.com/modules
*/

import { Module } from '@nestjs/common';

import { TasksController } from './http/tasks.controller';
import { TasksService } from './domain/tasks.service';
import { provideTasksRepository } from './domain/repositories/tasks.repository.provider';
import { TaskModel } from './domain/models/tasks.model';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([TaskModel])],
  controllers: [TasksController],
  providers: [TasksService, ...provideTasksRepository(), TypeOrmModule],
})
export class TasksModule {}
>>>>>>> 8192f77 (refactory: docker end database connection)
