import { Test, TestingModule } from '@nestjs/testing';
import { PostsController, UserPostsController } from './posts.controller';
import { PostsService } from './posts.service';
import { UsersService } from 'src/users/users.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

import { ForbiddenException, BadRequestException } from '@nestjs/common';

describe('PostsController', () => {
  let postsController: PostsController;
  let postsService: PostsService;
  let usersService: UsersService;

  const mockPostsService = {
    findOne: jest.fn(),
    findAll: jest.fn(),
    findPostsByUser: jest.fn(),
  };

  const mockUsersService = {
    findByEmail: jest.fn(),
  };

  const mockRequest = (user: any) => ({
    user,
  });

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PostsController],
      providers: [
        {
          provide: PostsService,
          useValue: mockPostsService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
      ],
    }).compile();

    postsController = module.get<PostsController>(PostsController);
    postsService = module.get<PostsService>(PostsService);
    usersService = module.get<UsersService>(UsersService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('findOne', () => {
    it('should return a post by ID', async () => {
      const postId = 1;
      const post = { id: postId, title: 'Test Post', content: 'Test Content' };

      mockPostsService.findOne.mockResolvedValue(post);

      const result = await postsController.findOne(postId.toString());

      expect(result).toEqual(post);
      expect(mockPostsService.findOne).toHaveBeenCalledWith(postId);
    });

    it('should throw BadRequestException if post ID is invalid', async () => {
      await expect(postsController.findOne('invalid')).rejects.toThrow(
        BadRequestException,
      );
    });
  });

  describe('findAll', () => {
    it('should return a list of posts', async () => {
      const paginationDto = { page: 1, limit: 10 };
      const posts = [
        { id: 1, title: 'Post 1', content: 'Content 1' },
        { id: 2, title: 'Post 2', content: 'Content 2' },
      ];

      mockPostsService.findAll.mockResolvedValue(posts);

      const result = await postsController.findAll(paginationDto);

      expect(result).toEqual(posts);
      expect(mockPostsService.findAll).toHaveBeenCalledWith(paginationDto);
    });
  });

  describe('findUserPosts', () => {
    it('should return posts by the authenticated user', async () => {
      const user = { sub: 1 };
      const userPosts = [
        { id: 1, title: 'User Post 1', content: 'Content 1' },
        { id: 2, title: 'User Post 2', content: 'Content 2' },
      ];

      mockPostsService.findPostsByUser.mockResolvedValue(userPosts);

      const result = await UserPostsController.findUserPosts(mockRequest(user));

      expect(result).toEqual(userPosts);
      expect(mockPostsService.findPostsByUser).toHaveBeenCalledWith(user.sub);
    });

    it('should throw ForbiddenException if user is not authenticated', async () => {
      await expect(
        postsController.findUserPosts(mockRequest(null)),
      ).rejects.toThrow(ForbiddenException);
    });
  });
});
