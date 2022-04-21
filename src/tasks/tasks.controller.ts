import { Body, Controller, Get, Post } from '@nestjs/common';

import { ITask } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getAllTasks(): ITask[] {
    return this.tasksService.getAllTasks();
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.createTask(createTaskDto);
  }
}
