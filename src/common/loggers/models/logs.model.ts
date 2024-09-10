import { Entity, Column, Index, CreateDateColumn, UpdateDateColumn } from 'typeorm';

@Entity({ name: 'logs' })
export class LogsModel {
  @Column({ primary: true, generated: 'uuid', nullable: false })
  id: string;

  @Index()
  @Column()
  level: string;

 
  @Column()
  context: string;

  @Index()
  @Column()
  operatorId: string;

  
  @Column()
  message: string;


  @Column()
  timestamp: Date;

 
}

