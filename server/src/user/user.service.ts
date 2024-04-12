import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';
import { hash, compare } from 'bcrypt';
import { CreateUserDto, LoginDto } from './dto/user.dto';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createUser(createUserDto: CreateUserDto): Promise<{ email: string }> {
    const existingUser = await this.findByEmail(createUserDto.email);
    if (existingUser) {
        throw new Error('User already exists');
    }
    const hashedPassword = await hash(createUserDto.password, 10);
    const user = this.userRepository.create({ 
        firstName: createUserDto.firstName,
        lastName: createUserDto.lastName,
        email: createUserDto.email,
        password: hashedPassword,
    });
    await this.userRepository.save(user);
    return {
        email: user.email
    }
  }

  async findByEmail(email: string): Promise<User | undefined> {
    return this.userRepository.findOne({ where: { email } });
  }

  async login(logInDto: LoginDto): Promise<{ token: string, user: User }> {
    const {email, password} = logInDto;
    const user = await this.findByEmail(email);
    if (!user) {
        throw new Error('Invalid username or password');
    }
    const isPasswordValid = await compare(password, user.password);
    if (!isPasswordValid) {
        throw new Error('Invalid username or password');
    }
    delete user.password;
    const payload = {
        id: user._id,
    }
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRY });
    return {
        token,
        user
    }
  }
}
