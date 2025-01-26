// src/posts/posts.controller.ts

import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, ForbiddenException } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';  // Import the custom interface

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user = req.user as JwtPayload;  // Use JwtPayload interface

    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }

    return this.postsService.create(createPostDto, user.sub); // Pass user ID (sub) for post creation
  }

  @Get()
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id); // Convert string ID to number
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: Request) {
    const user = req.user as JwtPayload;  // Use JwtPayload interface

    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }

    return this.postsService.update(+id, updatePostDto, user.sub); // Pass user ID for authorization
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JwtPayload;  // Use JwtPayload interface

    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }

    return this.postsService.delete(+id, user.sub); // Pass user ID for deletion authorization
  }

  @Get('test')
  testRoute() {
    return {
      message: 'This is a test GET route',
    };
  }
}
