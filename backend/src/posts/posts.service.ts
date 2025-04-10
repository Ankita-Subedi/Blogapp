/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Post, PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { GetPostWithAutherName } from './pipelines/get-post-with-auther.pipeline';

@Injectable()
export class PostService {
  constructor(@InjectModel(Post.name) private postModel: Model<PostDocument>) {}

  //CREATE
  async create(
    createPostDto: CreatePostDto,
    author: Types.ObjectId,
  ): Promise<{ message: string; blog: Post }> {
    try {
      const blog = await this.postModel.create({ ...createPostDto, author });
      return {
        message: 'Post created successfully',
        blog,
      };
    } catch (error) {
      if (error instanceof Error) {
        throw new BadRequestException(error.message);
      }
      throw new BadRequestException('Something went wrong');
    }
  }

  //FIND ALL POST OF ALL USERS
  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    posts: any[];
    metadata: {
      totalPages: number;
      totalPosts: number;
      page: number;
      limit: number;
    };
  }> {
    const skip = (page - 1) * limit;

    const totalPosts = await this.postModel.countDocuments(); // Get total number of posts
    const totalPages = Math.ceil(totalPosts / limit); // Calculate total pages

    const posts = await this.postModel
      .aggregate(GetPostWithAutherName)
      //.populate('author', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      posts,
      metadata: {
        totalPages,
        totalPosts,
        page,
        limit,
      },
    }; // Returning posts with pagination info
  }

  //FIND ALL POST OF PARTICULAR USER
  async findAllByUser(
    userId: Types.ObjectId,
    page: number = 1,
    limit: number = 10,
  ): Promise<{
    posts: Post[];
    metadata: {
      totalPages: number;
      totalPosts: number;
      page: number;
      limit: number;
    };
  }> {
    const skip = (page - 1) * limit;

    const totalPosts = await this.postModel.countDocuments({ author: userId }); // Total posts by user
    const totalPages = Math.ceil(totalPosts / limit); // Calculate total pages

    const posts = await this.postModel
      .find({ author: userId })
      .populate('author', 'name')
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 })
      .exec();

    return {
      posts,
      metadata: {
        totalPages,
        totalPosts,
        page,
        limit,
      },
    }; // Returning user-specific posts with pagination info
  }

  //FIND POST BY ID
  async findById(id: string): Promise<Post | null> {
    return this.postModel.findById(id).populate('author', 'name').exec();
  }

  async update(
    id: string,
    updatePostDto: Partial<CreatePostDto>,
    userId: string,
  ) {
    // Find the post and update it
    const data = await this.postModel
      .findOneAndUpdate({ _id: id, author: userId }, updatePostDto, {
        new: true, // Return the updated document
      })
      .exec();

    if (!data) {
      // If no post is found or the user is not the author, throw an exception
      throw new BadRequestException('Error updating post or unauthorized');
    }

    // Return a success message with the updated post data
    return {
      message: `Post with id: ${id} updated successfully`,
      data,
    };
  }

  //DELETE
  async delete(id: string, userId: string) {
    console.log('Deleting post:', { id, userId });
    try {
      if (!Types.ObjectId.isValid(id)) {
        throw new BadRequestException(
          'Invalid post ID format. Must be a 24-character hex string.',
        );
      }

      const objectId = new Types.ObjectId(id);
      const userObjectId = new Types.ObjectId(userId);
      const data = await this.postModel.findOneAndDelete({
        _id: objectId,
        author: userObjectId,
      });
      if (!data) throw new NotFoundException('Error deleting post');
      return {
        message: `Post with id : ${id} deleted successfully`,
        data,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
