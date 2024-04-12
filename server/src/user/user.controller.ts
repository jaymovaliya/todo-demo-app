import { Controller, Post, Body, HttpException, HttpStatus } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import { User } from './user.entity';

@Controller('auth')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('signup')
  async signup(@Body() createUserDto: CreateUserDto): Promise<{ email: string }> {
    return this.userService.createUser(createUserDto);
  }

  @Post('login')
  async login(@Body() logInDto: LoginDto): Promise<{ token: string, user: User }> {
    return this.userService.login(logInDto);
  }
}
