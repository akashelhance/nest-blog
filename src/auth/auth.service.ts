import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  async login(user: any) {
    const payload = { sub: user.id, email: user.email };
    return this.jwtService.sign(payload); // Generate JWT
  }
}
