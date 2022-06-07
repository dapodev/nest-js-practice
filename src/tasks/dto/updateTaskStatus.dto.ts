import { IsEnum } from 'class-validator';

import { TaskStatus } from '../taskStatus.model';

export class UpdateTaskStatusDto {
  @IsEnum(TaskStatus)
  status: TaskStatus;
}
