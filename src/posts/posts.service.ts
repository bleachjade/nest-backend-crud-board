import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from './posts.entity';
import { User } from '../users/users.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
  ) {}

  async createPost(title: string, content: string, user: User): Promise<Post> {
    const post = this.postsRepository.create({ title, content, user });
    console.log(post);
    return this.postsRepository.save(post);
  }

  async findAll(): Promise<Post[]> {
    return this.postsRepository.find({ relations: ['user'] });
  }

  async findById(id: number): Promise<Post> {
    return this.postsRepository.findOne({
      where: { id },
      relations: ['user'],
    });
  }

  async findByUserId(userId: number): Promise<Post[]> {
    console.log(`Fetching posts for user ID: ${userId}`);

    const posts = await this.postsRepository.find({
      where: {user: {id: userId}},
      relations: ['user'],
    });
    console.log(posts)

    if (!posts.length) {
      console.log(`No posts found for user ID: ${userId}`);
      throw new NotFoundException(`No posts found for user with ID ${userId}`);
    }

    console.log(`Posts found: ${posts.length}`);
    return posts;
  }

  async updatePost(id: number, title: string, content: string): Promise<Post> {
    const post = await this.findById(id);
    post.title = title;
    post.content = content;
    return this.postsRepository.save(post);
  }

  async deletePost(id: number): Promise<void> {
    await this.postsRepository.delete(id);
  }
}
