import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

import { TaskStatus } from './taskStatus.model';

@Entity('tasks')
export class Task {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ default: TaskStatus.OPEN })
  status: TaskStatus;
}
