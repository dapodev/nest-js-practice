import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

import { ETaskStatus } from '../task.model';

class GetTasksFilterDto {
  @IsOptional()
  @IsEnum(ETaskStatus)
  status?: ETaskStatus;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  search?: string;
}

export { GetTasksFilterDto };
