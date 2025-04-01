import { Injectable, Res } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { User, UserDocument } from '../users/schemas/user.schema';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';
import { Response } from 'express';

@Injectable()
export class AuthService {
  constructor(
    private configService: ConfigService,
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async signup(signupDto: SignupDto) {
    const newUser = await this.userService.createUser(signupDto);
    const token = this.generateJwtToken(newUser);
    return { user: newUser, token };
  }

  async login(loginDto: LoginDto) {
    const user = await this.userService.loginUser(loginDto);
    const token = this.generateJwtToken(user);
    return { user, token };
  }

  // Helper function to generate JWT token
  private generateJwtToken(user: UserDocument) {
    const payload = { email: user.email, sub: user._id };
    const token = this.jwtService.sign(payload);
    return token;
  }
}
