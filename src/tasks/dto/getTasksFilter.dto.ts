import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { TaskStatus } from '../taskStatus.model';

class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;
}

export { GetTasksFilterDto };
