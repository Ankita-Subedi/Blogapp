import { IsString, IsEmail, MinLength } from 'class-validator';
import { Transform } from 'class-transformer';

export class SignupDto {
  @IsString()
  @Transform(({ value }) => value.trim())
  name: string;

  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim()) // Convert to lowercase
  email: string;

  @IsString()
  @MinLength(6)
  password: string;
}
