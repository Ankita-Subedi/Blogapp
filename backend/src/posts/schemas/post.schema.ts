import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, HydratedDocument } from 'mongoose';

@Schema({ timestamps: true })
export class Post {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  content: string;

  @Prop({ type: String, ref: 'User', required: true })
  author: string;
}

export const PostSchema = SchemaFactory.createForClass(Post);
export type PostDocument = HydratedDocument<Post>;
