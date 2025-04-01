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
} from '@nestjs/common';
import { PostService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { Post as PostModel } from './schemas/post.schema';
import { AuthGuard, UserReq } from 'src/auth/guard/auth.guard';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @PostMethod('create')
  async create(
    @Body() createPostDto: CreatePostDto,
    @Request() req: UserReq,
  ): Promise<PostModel> {
    return this.postService.create(createPostDto, req.user.sub);
  }

  @Get('')
  async findAll(): Promise<PostModel[]> {
    return this.postService.findAll();
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
  ): Promise<PostModel | null> {
    return this.postService.update(id, updatePostDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(
    @Param('id') id: string,
    @Request() req: UserReq,
  ): Promise<PostModel | null> {
    return this.postService.delete(id, req.user.sub);
  }
}
