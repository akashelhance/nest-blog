import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdatePostDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  content?: string;

  @IsInt()
  @IsOptional()
  authorId?: number;  
}
