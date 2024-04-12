import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Todo, TodoStatus } from './todo.entity';
import { CreateTodoDto, UpdateTodoDto } from './dto/todo.dto';
import { ObjectId } from 'mongodb';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private readonly todoRepository: Repository<Todo>,
  ) {}

  create(createTodoDto: CreateTodoDto, userId: string): Promise<Todo> {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description;
    todo.userId = userId;
    todo.status = TodoStatus.NOT_STARTED;
    return this.todoRepository.save(todo);
  }

  findAll(userId: string, status?: TodoStatus): Promise<Todo[]> {
    if (status) {
      return this.todoRepository.find({
        where: {
            status: status,
            userId: userId,
        }
      });
    }
    return this.todoRepository.find({
      where: {
          userId: userId,
      }
    });
  }

  async findOne(id: string, userId: string): Promise<Todo> {
    return this.todoRepository.findOne({
        where: {
            _id: new ObjectId(id),
            userId: userId,
        }
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto, userId: string): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
        where: {
            _id: new ObjectId(id),
            userId: userId,
        }
    });
    if (!todo) {
      throw new HttpException('Todo not found', HttpStatus.NOT_FOUND);
    }
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async remove(id: string, userId: string): Promise<void> {
    await this.todoRepository.delete({
        _id: new ObjectId(id),
        userId: userId,
    });
  }
}
