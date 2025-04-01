import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { SignupDto } from '../auth/dto/signup.dto';
import { LoginDto } from '../auth/dto/login.dto';
import * as bcrypt from 'bcryptjs';
import { User, UserDocument } from '../users/schemas/user.schema';

@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<UserDocument>,
  ) {}

  // Signup method
  async createUser(signupDto: SignupDto) {
    const { email, password, name } = signupDto;

    // Check if the email already exists
    const userExists = await this.userModel.findOne({ email });
    if (userExists) {
      throw new UnauthorizedException('User with this email already exists.');
    }

    // Hash the password (bcrypt handles salt generation internally)
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user directly using .create()
    const newUser = await this.userModel.create({
      email,
      password: hashedPassword,
      name,
    });

    return newUser;
  }

  // Login method
  async loginUser(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userModel.findOne({ email });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    // Compare password
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      throw new UnauthorizedException('Invalid email or password.');
    }

    return user; // Return user object to generate token in AuthService
  }
}
