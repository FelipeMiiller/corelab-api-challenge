import { Inject, NotFoundException } from '@nestjs/common';
import { TaskEntity } from 'src/modules/tasks/domain/entities/tasks.entity';
import { TaskModel } from 'src/modules/tasks/domain/models/tasks.model';

import { TasksRepository } from 'src/modules/tasks/domain/repositories/tasks.repository.interface';
import { DeepPartial, Repository } from 'typeorm';

export class TasksTypeOrmRepository implements TasksRepository {
  constructor(
    @Inject('TASK_REPOSITORY')
    private readonly tasksRepository: Repository<TaskModel>,
  ) {}

  async create(task: TaskEntity): Promise<TaskModel> {
    const tasksCreated = this.tasksRepository.create(task);

    return this.tasksRepository.save(tasksCreated);
  }

  async update(id: string, task: Partial<TaskEntity>): Promise<DeepPartial<TaskModel>> {
    const filteredTask: Partial<TaskEntity> = Object.keys(task).reduce((acc, key) => {
      if (Boolean(task[key])) {
        acc[key] = task[key];
      }
      return acc;
    }, {});

    const tasksUpdated = await this.tasksRepository.preload({ id: id, ...filteredTask });

    if (!tasksUpdated) {
      throw new NotFoundException(`Task not found ${id}`);
    }

    return this.tasksRepository.save(tasksUpdated);
  }

  async findAll(): Promise<TaskModel[]> {
    return this.tasksRepository.find();
  }

  async findOne(id: string): Promise<TaskModel> {
    return this.tasksRepository.findOneBy({ id });
  }

  async delete(id: string): Promise<void> {
    await this.tasksRepository.delete({ id });
  }
}
