import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PaginationDto } from '../common/dto/pagination.dto';  // Assuming you have a common pagination DTO

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

  async findAll(paginationDto: PaginationDto): Promise<any> {
    const { page, limit } = paginationDto;
  
    const itemsPerPage = limit || 10;
    const offset = (page - 1) * itemsPerPage;

    const [posts, total] = await this.postRepository.findAndCount({
      take: itemsPerPage,  
      skip: offset,        
    });
    return {
      data: posts,
      total,
      page,
      lastPage: Math.ceil(total / itemsPerPage),
    };
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

  async findPostsByUser(userId: number) {
    return this.postRepository.find({ where: { authorId: userId } });
  }
  
}
