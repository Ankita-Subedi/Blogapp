import { IsString, IsEmail } from 'class-validator';
import { Transform } from 'class-transformer';

export class LoginDto {
  @IsEmail()
  @Transform(({ value }) => value.toLowerCase().trim()) // Convert to lowercase
  email: string;

  @IsString()
  password: string;
}
