import { IsOptional, IsString } from 'class-validator';

export class UpdateMembersDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  className?: string;
}
