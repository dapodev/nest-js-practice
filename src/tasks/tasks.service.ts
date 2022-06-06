import { Injectable, NotFoundException } from '@nestjs/common';
import { remove } from 'lodash';

import { generateUniqueId } from 'src/common/utils/id';

import { ETaskStatus, ITask } from './task.model';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';

@Injectable()
export class TasksService {
  private tasks: ITask[] = [];

  getAllTasks(): ITask[] {
    return this.tasks;
  }

  getTasksWithFilters(filter: GetTasksFilterDto): ITask[] {
    const { status, search } = filter;

    let filteredTasks = this.tasks;

    filteredTasks = status
      ? filteredTasks.filter((task) => task.status === status)
      : filteredTasks;

    filteredTasks = search
      ? filteredTasks.filter((task) => {
          const searchRegexp = new RegExp(search);
          return (
            searchRegexp.test(task.title) || searchRegexp.test(task.description)
          );
        })
      : filteredTasks;

    return filteredTasks;
  }

  getTaskById(id: string): ITask {
    const taskFound = this.tasks.find((task) => task.id === id);

    if (!taskFound) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return taskFound;
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
    const foundTask = this.getTaskById(id);
    const [removedTask] = remove(this.tasks, { id: foundTask.id });
    return removedTask;
  }

  updateTaskStatus(id: string, status: ETaskStatus): ITask {
    const updatedTask = this.getTaskById(id);
    updatedTask.status = status;
    return updatedTask;
  }
}
