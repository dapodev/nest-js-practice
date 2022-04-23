import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';

import { ETaskStatus, ITask } from './task.model';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/createTask.dto';
import { GetTasksFilterDto } from './dto/getTasksFilter.dto';
import { isEmpty } from 'lodash';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): ITask[] {
    const isFilterRequired = !isEmpty(Object.keys(filterDto));
    if (isFilterRequired) {
      return this.tasksService.getTasksWithFilters(filterDto);
    } else {
      return this.tasksService.getAllTasks();
    }
  }

  @Get('/:id')
  getTaskById(@Param('id') id: string): ITask {
    return this.tasksService.getTaskById(id);
  }

  @Delete('/:id')
  deleteTaskById(@Param('id') id: string): ITask {
    return this.tasksService.deleteTask(id);
  }

  @Patch('/:id/status')
  updateTaskStatus(
    @Param('id') id: string,
    @Body('status') status: ETaskStatus,
  ): ITask {
    return this.tasksService.updateTaskStatus(id, status);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): ITask {
    return this.tasksService.createTask(createTaskDto);
  }
}
