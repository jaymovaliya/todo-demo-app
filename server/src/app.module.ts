import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TodoModule } from './todo/todo.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useFactory: () => {
        return {
          type: 'mongodb',
          url: process.env.DB_CONNECTION,
          database: 'todo',
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: true,
        }
      }
    }),
    TodoModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
