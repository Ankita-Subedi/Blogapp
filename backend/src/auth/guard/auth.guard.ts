import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

export type UserReq = Request & {
  user: {
    email: string;
    sub: string;
  };
};

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<UserReq>();
    const authHeader = request.headers.authorization;
    // Check if authorization header exists and starts with "Bearer "
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('No token provided');
    }

    const token = authHeader.split(' ')[1];

    try {
      // Try verifying the token

      const decoded = await this.jwtService.decode(token);

      // Attach decoded user data to the request
      request.user = decoded;
      return true;
    } catch (err) {
      if (err?.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token has expired');
      }

      throw new UnauthorizedException('Invalid token');
    }
  }
}
