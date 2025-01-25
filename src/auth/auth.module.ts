import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { GoogleStrategy } from './google.strategy';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';

@Module({
  imports: [
    UsersModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
  
    JwtModule.register({
      secret: "helloworld",
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [AuthService, GoogleStrategy],
  controllers: [AuthController], // Register the AuthController
  exports: [AuthService],
})
export class AuthModule {}
