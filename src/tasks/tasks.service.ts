import { Injectable } from '@nestjs/common';

import { ETaskStatus, ITask } from './task.model';

import { generateUniqueId } from 'src/common/utils/id';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  createTask(title: string, description: string): ITask {
    const task: ITask = {
      id: generateUniqueId(),
      title,
      description,
      status: ETaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }
}
