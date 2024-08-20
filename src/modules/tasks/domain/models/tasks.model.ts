import { Entity, Column, PrimaryGeneratedColumn, Generated, BeforeInsert, Index } from 'typeorm';
import { TaskEntity } from '../entities/tasks.entity';
import { defaultIfEmpty } from 'rxjs';

@Entity({ name: 'tasks' })
export class TaskModel {
  constructor(readonly taskEntity: TaskEntity) {
    if (taskEntity) {
      this.title = taskEntity.title;
      this.description = taskEntity.description;
      this.isFavorite = taskEntity.isFavorite;
      this.color = taskEntity.color;
      this.filePath = taskEntity.filePath;
    }
  }

  @Column({ primary: true, generated: 'uuid', nullable: false })
  id: string;

  @Index()
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @Index()
  @Column({ default: false })
  isFavorite: boolean;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  filePath: string;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updatedAt: Date;
}
