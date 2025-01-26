import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto, userId: number): Promise<Post> {
    const post = this.postRepository.create({ ...createPostDto, authorId: userId });
    return this.postRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) {
      throw new NotFoundException(`Post with ID ${id} not found`);
    }
    return post;
  }

  async update(id: number, updatePostDto: UpdatePostDto, userId: number): Promise<Post> {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('You are not authorized to update this post');
    }

    Object.assign(post, updatePostDto);
    return this.postRepository.save(post);
  }

  async delete(id: number, userId: number): Promise<void> {
    const post = await this.findOne(id);
    if (post.authorId !== userId) {
      throw new ForbiddenException('You are not authorized to delete this post');
    }

    await this.postRepository.remove(post);
  }
}
