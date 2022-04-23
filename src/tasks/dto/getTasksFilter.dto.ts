import { ETaskStatus } from '../task.model';

class GetTasksFilterDto {
  status?: ETaskStatus;
  search?: string;
}

export { GetTasksFilterDto };
