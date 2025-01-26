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
  authorId?: number;  // Optional field in case you want to update the author, though typically not necessary
}
