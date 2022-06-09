import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { User } from 'src/auth/user.entity';

import { TaskStatus } from './taskStatus.model';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { Task } from './task.entity';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async getTasksWithFilters(
    filter: GetTasksFilterDto,
    user: User,
  ): Promise<Task[]> {
    const { status, search } = filter;

    const query = await this.tasksRepository.createQueryBuilder('task');
    query.where({ user });

    if (status) {
      query.andWhere({ status });
    }

    if (search) {
      query.andWhere(
        '(LOWER(task.title) LIKE LOWER(:search) or LOWER(task.description) LIKE LOWER(:search))',
        { search: `%${search}%` },
      );
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

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    const { title, description } = createTaskDto;

    const task = await this.tasksRepository.create({
      title,
      description,
      user,
    });

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
