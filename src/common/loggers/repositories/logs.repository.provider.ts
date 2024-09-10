import { Repository } from 'typeorm';
import { TaskModel } from '../models/logs.model';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Provider } from '@nestjs/common';
import { TasksTypeOrmRepository } from './implementations/logs.repository';
import { USERS_REPOSITORY_TOKEN } from './implementations/logs.repository.interface';

export function provideTasksRepository(): Provider[] {
  return [
    {
      provide: USERS_REPOSITORY_TOKEN,
      useFactory: async (dependenciesProvider: TasksRepoDependenciesProvider) =>
        new TasksTypeOrmRepository(dependenciesProvider.typeOrmRepository),
      inject: [TasksRepoDependenciesProvider],
    },
    TasksRepoDependenciesProvider,
  ];
}

@Injectable()
export class TasksRepoDependenciesProvider {
  constructor(
    @InjectRepository(TaskModel)
    public typeOrmRepository: Repository<TaskModel>,
  ) {}
}
