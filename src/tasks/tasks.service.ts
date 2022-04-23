import { Injectable } from '@nestjs/common';
import { remove } from 'lodash';

import { ETaskStatus, ITask } from './task.model';
import { CreateTaskDto } from './dto/createTask.dto';

import { generateUniqueId } from 'src/common/utils/id';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTaskById(id: string): ITask {
    return this.tasks.find((task) => task.id === id);
  }

  createTask(createTaskDto: CreateTaskDto): ITask {
    const { title, description } = createTaskDto;

    const task: ITask = {
      id: generateUniqueId(),
      title,
      description,
      status: ETaskStatus.OPEN,
    };

    this.tasks.push(task);

    return task;
  }

  deleteTask(id: string): ITask {
    const [removedTask] = remove(this.tasks, { id });
    return removedTask;
  }

  updateTaskStatus(id: string, status: ETaskStatus): ITask {
    const updatedTask = this.getTaskById(id);
    updatedTask.status = status;
    return updatedTask;
  }
}
