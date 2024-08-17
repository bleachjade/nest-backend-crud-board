import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  UseGuards,
} from '@nestjs/common';
import { PostsService } from './posts.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  async createPost(
    @Body() body: { title: string; content: string },
    @Request() req,
  ) {
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
