import { IsString, IsInt } from 'class-validator';
import { User } from 'src/users/entities/user.entity'; 

export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  content: string;

  @IsInt()
  authorId: number;  
}
