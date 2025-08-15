import { BadRequestException, CanActivate, ExecutionContext, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean {

    const request = context.switchToHttp().getRequest();
    const token = this.extractToken(request);

    if (token === "" || !token) {
      throw new UnauthorizedException("token not found!");
    }

    request.user = this.jwtService.decode(token);

    return true;
  }

  extractToken(request: Request): string {

    const [type, token]: any = request.headers.authorization?.split(" ")??["", ""];

    if (type !== "Bearer") throw new BadRequestException("token not found");

    return token;
  }
}
