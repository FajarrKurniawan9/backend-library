import { IsInt, IsString, IsOptional, Min } from 'class-validator';

export class UpdateBookDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  author?: string;

  @IsInt()
  @Min(1)
  @IsOptional()
  year?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  stock?: number;
}
