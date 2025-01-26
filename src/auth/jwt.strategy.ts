import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { UnauthorizedException } from '@nestjs/common';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token from Authorization header
      secretOrKey: "helloworld"
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    const { sub } = payload; // Assuming your JWT payload has a `sub` field as user ID
    const user = await this.usersService.findOne(sub); // Fetch user by ID
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user; // Attach user to request object
  }
}
