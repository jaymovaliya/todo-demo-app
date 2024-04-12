import { Controller, Get, Post, Body, Param, Put, Delete, Query } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, TodoStatus } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
@Controller('todos')
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto): Promise<Todo> {
    return await this.todoService.create(createTodoDto);
  }

  @Get()
  async findAll(@Query('status') status?: TodoStatus): Promise<Todo[]> {
    return await this.todoService.findAll(status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<Todo> {
    return await this.todoService.findOne(id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto): Promise<Todo> {
    return await this.todoService.update(id, updateTodoDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string): Promise<void> {
    await this.todoService.remove(id);
  }
}
