import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Req,
  ForbiddenException,
  BadRequestException,
  Query,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

import { User } from 'src/users/entities/user.entity'; // Assuming you're using a TypeORM entity
import { UsersService } from 'src/users/users.service';

@Controller('posts')
export class PostsController {
  constructor(
    private readonly postsService: PostsService,
    private readonly userService: UsersService,  // Inject UserService
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user = req.user as JwtPayload;
    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }
    return this.postsService.create(createPostDto, user.sub);
  }

 
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const postId = +id;
    if (isNaN(postId)) {
      throw new BadRequestException('Invalid post ID');
    }
    return this.postsService.findOne(postId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: UpdatePostDto,
    @Req() req: Request
  ) {
    const user = req.user as JwtPayload;
    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }
    const postId = +id;
    if (isNaN(postId)) {
      throw new BadRequestException('Invalid post ID');
    }
    return this.postsService.update(postId, updatePostDto, user.sub);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JwtPayload;
    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }
    const postId = +id;
    if (isNaN(postId)) {
      throw new BadRequestException('Invalid post ID');
    }
    return this.postsService.delete(postId, user.sub);
  }



  @UseGuards(JwtAuthGuard)
  @Get('user/email')
  async getUserEmail(@Req() req: Request) {
    const user = req.user as JwtPayload;

    if (!user || !user.email) {
      throw new ForbiddenException('Email not found');
    }

    // Fetch user information by email using UserService
    const userInfo = await this.userService.findByEmail(user.email);

    if (!userInfo) {
      throw new ForbiddenException('User not found');
    }

    return userInfo;  
  }


  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }
  
  @Get('test')
  testRoute() {
    return {
      message: 'This is a test GET route',
    };
  }
 
}


@Controller('test')
export class TestController {
  @Get()
  testRoute() {
    return { message: 'Hello World' };
  }
}


@Controller('user-posts')
export class UserPostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  async findUserPosts(@Req() req: Request) {
    const user = req.user as JwtPayload;

    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }

    // Fetch posts created by the logged-in user using the posts service
    return this.postsService.findPostsByUser(user.sub);
  }
}