import { Entity, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';


@Entity({ name: 'tasks' })
export class TaskModel {
  

  @Column({ primary: true, generated: 'uuid', nullable: false })
  id: string;

  @Index()
  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

 
  @Column({ default: false })
  isFavorite: boolean;

  @Column({ nullable: true })
  color: string;

  @Column({ nullable: true })
  filePath: string;

  @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
   createdAt: Date;
  
  @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
   updatedAt: Date;
}
