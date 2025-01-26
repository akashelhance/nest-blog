import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/jwt.guard'; // Protect routes with JWT if needed

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  /**
   * Create a new user
   * @param createUserDto User data
   * @returns The created user
   */
  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  /**
   * Find a user by their Google ID
   * @param googleId Google ID of the user
   * @returns The user or null if not found
   */
  @Get('google/:googleId')
  async findByGoogleId(@Param('googleId') googleId: string) {
    const user = await this.usersService.findByGoogleId(googleId);
    if (!user) {
      return { message: `User with Google ID ${googleId} not found` };
    }
    return user;
  }

  /**
   * Find a user by their email
   * @param email Email of the user
   * @returns The user or null if not found
   */
  @Get('email/:email')
  async findByEmail(@Param('email') email: string) {
    const user = await this.usersService.findByEmail(email);
    if (!user) {
      return { message: `User with email ${email} not found` };
    }
    return user;
  }
}
