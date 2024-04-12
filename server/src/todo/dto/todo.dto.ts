import { IsString, IsOptional, MinLength, MaxLength, IsNotEmpty } from 'class-validator';
import { TodoStatus } from '../todo.entity';

export class CreateTodoDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  @MaxLength(100)
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(2000)
  description: string;
}

export class UpdateTodoDto {
  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(100)
  title?: string;

  @IsString()
  @IsOptional()
  @MinLength(0)
  @MaxLength(2000)
  description?: string;

  @IsString()
  @IsOptional()
  status?: TodoStatus;
}
