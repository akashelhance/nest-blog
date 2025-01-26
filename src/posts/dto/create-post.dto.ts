import { IsString, IsInt } from 'class-validator';
import { User } from 'src/users/entities/user.entity'; // Import the User entity

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  authorId: number;  // Store the author's user ID
}
