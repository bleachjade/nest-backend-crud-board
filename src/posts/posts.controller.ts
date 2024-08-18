import {
  Controller,
  Get,
  Put,
  Post as PostMethod,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
  ParseIntPipe,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Post } from './posts.entity';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @PostMethod()
  async createPost(
    @Body() body: { title: string; content: string },
    @Request() req,
  ) {
    console.log(req)
    return this.postsService.createPost(body.title, body.content, req.user);
  }

  @Get()
  async findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: number) {
    return this.postsService.findById(id);
  }

  @Get('user/:userId')
  async getPostsByUserId(@Param('userId') userId: number): Promise<Post[]> {
    return this.postsService.findByUserId(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  async updatePost(
    @Param('id') id: number,
    @Body() body: { title: string; content: string },
  ) {
    return this.postsService.updatePost(id, body.title, body.content);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postsService.deletePost(id);
  }
}
