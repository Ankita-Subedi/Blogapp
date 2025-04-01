import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import {
  NotFoundException,
  UnauthorizedException,
  InternalServerErrorException,
} from '@nestjs/common';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  async create(createPostDto: CreatePostDto, author: string): Promise<Post> {
    try {
      const data = await this.postModel.create({ ...createPostDto, author });
      return data;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async findAll(): Promise<Post[]> {
    return this.postModel.find().exec();
  }

  async findById(id: string): Promise<Post | null> {
    return this.postModel.findById(id).exec();
  }

  async update(
    id: string,
    updatePostDto: Partial<CreatePostDto>,
    userId: string,
  ): Promise<Post | null> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Check if the logged-in user is the author of the post
    if (post.author !== userId) {
      throw new UnauthorizedException('You are not the owner of this post');
    }

    try {
      return await this.postModel
        .findByIdAndUpdate(id, updatePostDto, { new: true })
        .exec();
    } catch (error) {
      throw new InternalServerErrorException('Could not update post');
    }
  }

  async delete(id: string, userId: string): Promise<Post | null> {
    const post = await this.postModel.findById(id);
    if (!post) {
      throw new NotFoundException('Post not found');
    }

    // Check if the logged-in user is the author of the post
    if (post.author !== userId) {
      throw new UnauthorizedException('You are not the owner of this post');
    }

    try {
      return await this.postModel.findByIdAndDelete(id);
    } catch (error) {
      throw new InternalServerErrorException('Failed to delete the post');
    }
  }
}
