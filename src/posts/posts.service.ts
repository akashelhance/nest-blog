import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  /**
   * Create a new post
   * @param post Partial post data (without id and createdAt)
   * @returns Created post
   */
  async create(post: Omit<Post, 'id' | 'createdAt'>): Promise<Post> {
    const newPost = this.postRepository.create({
      ...post,
      createdAt: new Date(), // Automatically set the timestamp
    });
    return this.postRepository.save(newPost);
  }

  /**
   * Get all posts
   * @returns Array of posts
   */
  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  /**
   * Get a single post by ID
   * @param id Post ID
   * @returns Found post or null
   */
  async findOne(id: number): Promise<Post | null> {
    const post = await this.postRepository.findOne({ where: { id } });
    return post || null; // Return null if no post is found
  }

  // /**
  //  * Update a post by ID
  //  * @param id Post ID
  //  * @param updateData Partial data to update
  //  * @returns Updated post or null if not found
  //  */
  // // async update(id: number, updateData: Partial<Post>): Promise<Post | null> {
  // //   const post = await this.postRepository.findOne({ where: { id } });
  // //   if (!post) return null;

  // //   Object.assign(post, updateData); // Update the fields of the post
  // //   return this.postRepository.save(post); // Save the updated post
  // // }

  /**
   * Delete a post by ID
   * @param id Post ID
   * @returns Deleted post or null if not found
   */
  async delete(id: number): Promise<Post | null> {
    const post = await this.postRepository.findOne({ where: { id } });
    if (!post) return null;

    await this.postRepository.remove(post); // Remove the post from the database
    return post;
  }
}
