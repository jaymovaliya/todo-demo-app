import { Controller, Get, Post, Body, Param, Put, Delete, Query, UseGuards, Req } from '@nestjs/common';
import { TodoService } from './todo.service';
import { Todo, TodoStatus } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { AuthGuard } from 'src/auth.guard';
@Controller('todos')
@UseGuards(AuthGuard)
export class TodoController {
  constructor(private readonly todoService: TodoService) {}

  @Post()
  async create(@Body() createTodoDto: CreateTodoDto, @Req() req): Promise<Todo> {
    return await this.todoService.create(createTodoDto, req.user._id);
  }

  @Get()
  async findAll(@Req() req, @Query('status') status?: TodoStatus): Promise<Todo[]> {
    return await this.todoService.findAll(req.user._id, status);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req): Promise<Todo> {
    return await this.todoService.findOne(id, req.user._id);
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateTodoDto: UpdateTodoDto, @Req() req): Promise<Todo> {
    return await this.todoService.update(id, updateTodoDto, req.user._id);
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req): Promise<void> {
    await this.todoService.remove(id, req.user._id);
  }
}
