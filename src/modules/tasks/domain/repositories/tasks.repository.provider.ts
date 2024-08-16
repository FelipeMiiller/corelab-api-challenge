import { DataSource } from 'typeorm';
import { Task } from '../models/tasks.model';

export const provideTasksRepository = [
  {
    provide: 'TASK_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Task),
    inject: ['DATA_SOURCE'],
  },
];
