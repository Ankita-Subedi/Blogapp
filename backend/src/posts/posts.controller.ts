import {
  Controller,
  Get,
  Post as PostMethod,
  Body,
  Param,
  Put,
  Delete,
  UseGuards,
  Request,
  Query,
} from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from './schemas/post.schema';
import { AuthGuard, UserReq } from 'src/auth/guard/auth.guard';
import { Types } from 'mongoose';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @PostMethod('create')
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: UserReq,
  ): Promise<{ message: string; blog: PostModel }> {
    return this.postService.create(
      createPostDto,
      new Types.ObjectId(req.user.sub),
    );
  }

  @Get('')
  async findAll(@Query('page') page = 1, @Query('limit') limit = 10) {
    return this.postService.findAll(Number(page), Number(limit));
  }

  @UseGuards(AuthGuard)
  @Get('my-posts')
  async getMyPosts(
    @Request() req: UserReq,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.postService.findAllByUser(
      req.user.sub,
      Number(page),
      Number(limit),
    );
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<PostModel | null> {
    return this.postService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Put(':id/update')
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: Partial<CreatePostDto>,
    @Request() req: UserReq,
  ) {
    return this.postService.update(id, updatePostDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: UserReq) {
    return this.postService.delete(id, req.user.sub);
  }
}
