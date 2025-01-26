// src/posts/posts.controller.ts

import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, ForbiddenException, Query } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard';
import { Request } from 'express';

import { JwtPayload } from 'src/auth/interfaces/jwt-payload.interface';  
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async create(@Body() createPostDto: CreatePostDto, @Req() req: Request) {
    const user = req.user as JwtPayload;  

    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }

    return this.postsService.create(createPostDto, user.sub); 
  }

  @Get()
  async findAll(@Query() paginationDto: PaginationDto) {
    return this.postsService.findAll(paginationDto);
  }
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.postsService.findOne(+id); 
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto, @Req() req: Request) {
    const user = req.user as JwtPayload;  

    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }

    return this.postsService.update(+id, updatePostDto, user.sub); 
  }

  @Delete(':id')
  async remove(@Param('id') id: string, @Req() req: Request) {
    const user = req.user as JwtPayload;  

    if (!user || !user.sub) {
      throw new ForbiddenException('User not authenticated');
    }

    return this.postsService.delete(+id, user.sub); 
  }

  @Get('test')
  testRoute() {
    return {
      message: 'This is a test GET route',
    };
  }
}
