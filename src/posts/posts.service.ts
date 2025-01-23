import { Injectable } from '@nestjs/common';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private posts: Post[] = [];
  private idCounter = 1;

  create(post: Omit<Post, 'id' | 'createdAt'>) {
    const newPost = { ...post, id: this.idCounter++, createdAt: new Date() };
    this.posts.push(newPost);
    return newPost;
  }

  findAll() {
    return this.posts;
  }

  findOne(id: number) {
    return this.posts.find((post) => post.id === id);
  }

  update(id: number, updateData: Partial<Post>) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return null;

    this.posts[postIndex] = { ...this.posts[postIndex], ...updateData };
    return this.posts[postIndex];
  }

  delete(id: number) {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) return null;

    const [deletedPost] = this.posts.splice(postIndex, 1);
    return deletedPost;
  }
}
