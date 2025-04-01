import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { PostController } from './posts.controller';
import { PostService } from './posts.service';
import { Post, PostSchema } from './schemas/post.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Post.name, schema: PostSchema }]),
  ],
  controllers: [PostController],
  providers: [PostService, JwtService],
  exports: [PostService],
})
export class PostsModule {}
