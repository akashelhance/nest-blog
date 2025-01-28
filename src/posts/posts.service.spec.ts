import { Test, TestingModule } from '@nestjs/testing';
import { PostsService } from './posts.service';
import { DeepPartial, Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Post } from '../posts/entities/post.entity';
import { NotFoundException, ForbiddenException } from '@nestjs/common';
import { User } from '../users/entities/user.entity';

const mockPostRepository = () => ({
  create: jest.fn(),
  save: jest.fn(),
  findAndCount: jest.fn(),
  findOne: jest.fn(),
  find: jest.fn(),
  remove: jest.fn(),
});

describe('PostsService', () => {
  let service: PostsService;
  let repository: jest.Mocked<Repository<Post>>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        PostsService,
        {
          provide: getRepositoryToken(Post),
          useFactory: mockPostRepository, 
        },
      ],
    }).compile();

    service = module.get<PostsService>(PostsService);
    repository = module.get<Repository<Post>>(getRepositoryToken(Post)) as jest.Mocked<Repository<Post>>;
  });

  afterEach(() => {
    jest.clearAllMocks(); 
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  
  describe('findAll', () => {
    it('should return paginated posts', async () => {
      const paginationDto = { page: 1, limit: 10 };
  
  
      const posts = [
        { id: 1, title: 'Post 1', content: 'Content 1', authorId: 1 } as Post,
      ];
  
      repository.findAndCount.mockResolvedValue([posts, 1]); 
  
      const result = await service.findAll(paginationDto);
  
      expect(repository.findAndCount).toHaveBeenCalledWith({
        take: 10,
        skip: 0,
      });
  
     
      expect(result).toEqual({
        data: posts,
        total: 1,
        page: 1,
        lastPage: 1,
      });
    });
  });
  
  describe('findOne', () => {
    it('should return a post if found', async () => {
      const post = { id: 1, title: 'Test Post' };
      repository.findOne.mockResolvedValue(post as Post);

      const result = await service.findOne(1);

      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: 1 } });
      expect(result).toEqual(post);
    });

    it('should throw NotFoundException if post not found', async () => {
      repository.findOne.mockResolvedValue(null);

      await expect(service.findOne(1)).rejects.toThrow(NotFoundException);
    });
  });

  
  describe('delete', () => {
    it('should delete a post if the user is authorized', async () => {
      const post = { id: 1, authorId: 1 } as Post;
  
      repository.findOne.mockResolvedValue(post); 
      repository.remove.mockResolvedValue(post);
  
      await service.delete(1, 1); 
  
      expect(repository.remove).toHaveBeenCalledWith(post); 
    });
  
    it('should throw ForbiddenException if user is not authorized', async () => {
      const post = { id: 1, authorId: 2 } as Post;
  
      repository.findOne.mockResolvedValue(post); 
  
      await expect(service.delete(1, 1)).rejects.toThrow(ForbiddenException); 
    });
  });
  

  
});
