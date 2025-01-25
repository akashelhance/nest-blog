import { Controller, Get, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('google')
  @UseGuards(AuthGuard('google'))
  async googleAuth() {
    console.log('Redirecting to Google...');
  }

  @Get('google/callback')
  @UseGuards(AuthGuard('google'))
  async googleAuthCallback(@Req() req: any, @Res() res: any) {
    try {
      console.log('Google callback received');
      const user = req.user;  // This should contain the user object populated by GoogleStrategy
      if (!user) {
        throw new Error('User not found in Google callback');
      }

      console.log('User from Google:', user);
      const token = await this.authService.login(user);  // Generate JWT
      console.log('Generated JWT:', token);  // Log the generated token

      // Redirect to Angular app with the token
      res.redirect(`http://localhost:4200/login-success?token=${token}`);
    } catch (error) {
      console.error('Error in googleAuthCallback:', error);  // Log any errors
      res.status(500).send({ message: 'Internal Server Error', error: error.message });
    }
  }

  @Get('protected')
  @UseGuards(AuthGuard('jwt'))
  getProtectedResource() {
    return { message: 'This is a protected resource' };
  }

  @Get('signout')
  signOut(@Req() req: any, @Res() res: any) {
    try {
      console.log('Signing out user...');
      
      // Optionally, clear the token in the request headers if it's a session-based authentication.
      // For JWT, you just need to clear it from the client side.
      
      // Example: Clearing token on the client side (if applicable)
      res.clearCookie('token'); // or clear token from localStorage in Angular
      res.redirect('http://localhost:4200/signout-success'); // Redirect user to a successful logout page
    } catch (error) {
      console.error('Error during signout:', error);
      res.status(500).send({ message: 'Error during signout', error: error.message });
    }
  }
}
