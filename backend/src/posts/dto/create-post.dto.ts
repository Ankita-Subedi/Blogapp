import { IsString, IsNotEmpty } from 'class-validator';

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  // Add photo field too
  @IsString()
  @IsNotEmpty()
  photo: string; // This will store the filename or path of the uploaded photo
}
