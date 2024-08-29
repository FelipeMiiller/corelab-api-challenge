import { Inject, Logger, NotFoundException } from '@nestjs/common';
import { TaskEntity } from 'src/modules/tasks/domain/entities/tasks.entity';
import { TaskModel } from 'src/modules/tasks/domain/models/tasks.model';

import { TasksRepository, USERS_REPOSITORY_TOKEN } from 'src/modules/tasks/domain/repositories/implementations/tasks.repository.interface';
import { ILike, Repository } from 'typeorm';

export class TasksTypeOrmRepository implements TasksRepository {
  private readonly logger = new Logger(TasksTypeOrmRepository.name);
  constructor(
    @Inject(USERS_REPOSITORY_TOKEN)
    private readonly tasksRepository: Repository<TaskModel>,
  ) { }

  async create(task: TaskEntity): Promise<TaskModel> {
    const tasksCreated = this.tasksRepository.create(task);

    return this.tasksRepository.save(tasksCreated);
  }

  async update(id: string, task: Partial<TaskEntity>): Promise<TaskModel> {
    const filteredTask: Partial<TaskEntity> = Object.keys(task).reduce((acc, key) => {
      if (Boolean(task[key])) {
        acc[key] = task[key];
      }
      return acc;
    }, {});


    const updateTask = await this.tasksRepository.preload({
      id,
      ...filteredTask,
    });

    if (!updateTask) { return null }

    return await this.tasksRepository.save(updateTask);
  }


  async findById(id: string): Promise<TaskModel> {



    return this.tasksRepository.findOne({
      where: { id: id },

    });

  }


  async findLots(pagination?: Partial<{ page: number, limit: number }>, title?: string): Promise<TaskModel[]> {

    const { page = 1, limit = 10 } = pagination || {};

    const skip = (page - 1) * limit
    if (title) {

      return this.tasksRepository.find({
        where: { title: ILike(`%${title}%`) },
        skip,
        take: limit,

      })

    }
    return this.tasksRepository.find({
      skip,
      take: limit
    });



  }


  async delete(id: string): Promise<void> {
    await this.tasksRepository.delete({ id });
  }

  async deleteAll(): Promise<void> {
    await this.tasksRepository.delete({});
  }

}
