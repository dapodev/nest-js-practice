import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { TaskStatus } from './taskStatus.model';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { Task } from './task.entity';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: TasksRepository,
  ) {}

  async getTasksWithFilters(filter: GetTasksFilterDto): Promise<Task[]> {
    const { status, search } = filter;

    const query = await this.tasksRepository.createQueryBuilder();

    if (status) {
      query.andWhere({ status });
    }

    if (search) {
      query.andWhere({ title: search });
    }

    const found = await query.getMany();

    return found;
  }
  async getTaskById(id: string): Promise<Task> {
    const found = await this.tasksRepository.findOne(id);

    if (!found) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = await this.tasksRepository.create({ title, description });

    const savedTask = await this.tasksRepository.save(task);

    return savedTask;
  }

  async deleteTask(id: string): Promise<Task['id']> {
    const result = await this.tasksRepository.delete({ id });

    if (!result.affected) {
      throw new NotFoundException(`Task with ID "${id}" not found`);
    }

    return id;
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);

    task.status = status;

    const result = await this.tasksRepository.save(task);

    return result;
  }
}
