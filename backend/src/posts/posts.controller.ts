/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
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
import { multerOptions } from 'src/config/upload.config';

@Controller('posts')
export class PostController {
  constructor(private postService: PostService) {}

  //CREATE
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  @PostMethod('create')
  async create(
    @Body() createPostDto: CreatePostDto,
    @UploadedFile() photo: Express.Multer.File,
    @Request() req: UserReq,
  ): Promise<{ message: string; blog: PostModel }> {
    try {
      if (photo) {
        const filePath = `uploads/${photo.filename}`;
        createPostDto.photo = filePath;
      }
      return this.postService.create(
        createPostDto,
        new Types.ObjectId(req.user.sub),
      );
    } catch (error) {
      throw new BadRequestException(error.message);
    }
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
  @UseInterceptors(FileInterceptor('photo', multerOptions))
  async update(
    @Param('id') id: string,
    @Body() updatePostDto: Partial<CreatePostDto>,
    @UploadedFile() photo: Express.Multer.File,
    @Request() req: UserReq,
  ) {
    try {
      if (photo) {
        const filePath = `uploads/${photo.filename}`;
        updatePostDto.photo = filePath;
      }

      // Proceed with updating the post
      return this.postService.update(id, updatePostDto, req.user.sub);
    } catch (error) {
      // Handle any errors
      throw new BadRequestException(error.message);
    }
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req: UserReq) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    return this.postService.delete(id, req.user.sub);
  }
}
