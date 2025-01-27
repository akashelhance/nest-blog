import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { User } from 'src/users/entities/user.entity';
import { JwtPayload } from './interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersService: UsersService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract token
      secretOrKey: 'helloworld',
    });
  }

  async validate(payload: JwtPayload): Promise<User> {
    console.log('JWT Payload:', payload); // Debug payload

    const { sub } = payload;
    const user = await this.usersService.findOne(Number(sub)); 
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    console.log('Authenticated User:', user); 
    return user;
  }
}
