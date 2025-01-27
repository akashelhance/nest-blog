import { IsInt, IsOptional, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class PaginationDto {
  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)  
  page: number = 1;  

  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)  
  limit: number = 10; 
}
