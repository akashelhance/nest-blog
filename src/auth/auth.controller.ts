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
      const user = req.user;  
      if (!user) {
        throw new Error('User not found in Google callback');
      }

      console.log('User from Google:', user);
      const token = await this.authService.login(user); 
      console.log('Generated JWT:', token);  

      
      res.redirect(`http://localhost:4200/login?token=${token}`);
    } catch (error) {
      console.error('Error in googleAuthCallback:', error);  
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
      res.redirect('http://localhost:4200/signout-success'); 
    } catch (error) {
      console.error('Error during signout:', error);
      res.status(500).send({ message: 'Error during signout', error: error.message });
    }
  }
}
