import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { Post } from './entities/post.entity'; // Import the Post entity

@Module({
  imports: [TypeOrmModule.forFeature([Post])], // Register the Post entity with TypeOrm
  controllers: [PostsController],
  providers: [PostsService],
})
export class PostsModule {}
