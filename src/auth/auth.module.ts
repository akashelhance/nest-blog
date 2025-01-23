// auth/auth.module.ts
import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module'; 
import { JwtModule } from '@nestjs/jwt'; 

@Module({
  imports: [
    UsersModule, // Add UsersModule to the imports array
    JwtModule.register({
      secret: 'yourSecretKey', // Replace with your actual secret key
      signOptions: { expiresIn: '1h' }, // Customize expiration as needed
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
