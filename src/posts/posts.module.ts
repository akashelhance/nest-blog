import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController, UserPostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity'; 
import { AuthModule } from 'src/auth/auth.module'; 
import { UsersModule } from 'src/users/users.module';


@Module({
  imports: [AuthModule, TypeOrmModule.forFeature([Post]),UsersModule], 
  controllers: [PostsController, UserPostsController],
  providers: [PostsService],
})
export class PostsModule {}
