import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, VerifyCallback } from 'passport-google-oauth20';
import { UsersService } from '../users/users.service';

@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy, 'google') {
  constructor(private readonly usersService: UsersService) {
    super({
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL || 'http://localhost:3000/auth/google/callback',
      scope: ['email', 'profile'],
    });
  }

  async validate(accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<any> {
    try {
      console.log('Google Profile:', profile);  // Log the profile to see if Google returned the expected data
      const { id, emails, displayName, photos } = profile;

      let user = await this.usersService.findByGoogleId(id);
      if (!user) {
        user = await this.usersService.create({
          googleId: id,
          email: emails[0].value,
          name: displayName,
          profilePicture: photos[0].value,
        });
      }

      return done(null, user);  // Ensure user is being returned correctly
    } catch (error) {
      console.error('Error in GoogleStrategy:', error);  // Log any errors
      done(error, false);
    }
  }
}
