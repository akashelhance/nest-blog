import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PostsModule } from './posts/posts.module';
import { UsersModule } from './users/users.module';
import { DatabaseModule } from './database/database.module';

import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';


@Module({
  imports: [AuthModule, PostsModule, UsersModule, DatabaseModule, TypeOrmModule.forFeature([User]),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
