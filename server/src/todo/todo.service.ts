import { Injectable } from '@nestjs/common';
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

  create(createTodoDto: CreateTodoDto): Promise<Todo> {
    const todo = new Todo();
    todo.title = createTodoDto.title;
    todo.description = createTodoDto.description;
    todo.status = TodoStatus.NOT_STARTED;
    return this.todoRepository.save(todo);
  }

  findAll(status?: TodoStatus): Promise<Todo[]> {
    if (status) {
      return this.todoRepository.find({
        where: {
            status: status,
        }
      });
    }
    return this.todoRepository.find();
  }

  async findOne(id: string): Promise<Todo> {
    return this.todoRepository.findOne({
        where: {
            _id: new ObjectId(id),
        }
    });
  }

  async update(id: string, updateTodoDto: UpdateTodoDto): Promise<Todo> {
    const todo = await this.todoRepository.findOne({
        where: {
            _id: new ObjectId(id),
        }
    });
    if (!todo) {
      throw new Error('Todo not found');
    }
    Object.assign(todo, updateTodoDto);
    return this.todoRepository.save(todo);
  }

  async remove(id: string): Promise<void> {
    await this.todoRepository.delete(id);
  }
}
