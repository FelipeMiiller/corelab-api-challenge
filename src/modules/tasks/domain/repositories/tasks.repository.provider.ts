<<<<<<< HEAD
import { DataSource } from 'typeorm';
import { Task } from '../models/tasks.model';

export const provideTasksRepository = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];
=======
import { Repository } from 'typeorm';
import { TaskModel } from '../models/tasks.model';

import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, Provider } from '@nestjs/common';

import { DataSource } from '../../../../common/constants/typeorm';
import { TasksTypeOrmRepository } from './implementations/users.typeorm.repository';
import { TasksInMemoryRepository } from './implementations/tasks.in-memory.repository';

import { ConfigModule } from '@nestjs/config';
import { USERS_REPOSITORY_TOKEN } from './tasks.repository.interface';

export function provideTasksRepository(): Provider[] {
  return [
    {
      provide: USERS_REPOSITORY_TOKEN,
      useFactory: async (dependenciesProvider: TasksRepoDependenciesProvider) =>
        provideTasksRepositoryFactory(dependenciesProvider),
      inject: [TasksRepoDependenciesProvider],
    },
    TasksRepoDependenciesProvider,
  ];
}

async function provideTasksRepositoryFactory(dependenciesProvider: TasksRepoDependenciesProvider) {
  await ConfigModule.envVariablesLoaded;
  switch (process.env.DATABASE_DATASOURCE) {
    case DataSource.TYPEORM:
      return new TasksTypeOrmRepository(dependenciesProvider.typeOrmRepository);
    case DataSource.MEMORY:
    default:
      return new TasksInMemoryRepository();
  }
}

@Injectable()
export class TasksRepoDependenciesProvider {
  constructor(
    @InjectRepository(TaskModel)
    public typeOrmRepository: Repository<TaskModel>,
  ) {}
}
>>>>>>> 8192f77 (refactory: docker end database connection)
