import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post as PostMethod,
  Put,
  Query,
  Request,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Types } from 'mongoose';
import { AuthGuard, UserReq } from 'src/auth/guard/auth.guard';
import { CreatePostDto } from './dto/create-post.dto';
import { PostService } from './posts.service';
import { Post as PostModel } from './schemas/post.schema';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('photo'))
  @PostMethod('create')
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: UserReq,
  ): Promise<{ message: string; blog: PostModel }> {
    if (file) {
      createPostDto.photo = file.filename; // Save the filename of the uploaded photo
    }
    return this.postService.create(
      createPostDto,
      new Types.ObjectId(req.user.sub),
      file,
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
      new Types.ObjectId(req.user.sub),
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
  @UseInterceptors(FileInterceptor('photo'))
  async update(
    @Param('id')
    id: string,
    @Body() updatePostDto: Partial<CreatePostDto>,
    @UploadedFile() file: Express.Multer.File,
    @Request() req: UserReq,
  ) {
    if (file) {
      updatePostDto.photo = file.filename; // Save the filename of the uploaded photo
    }
    return this.postService.update(id, updatePostDto, req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: UserReq) {
    return this.postService.delete(id, req.user.sub);
  }
}
