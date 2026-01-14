import { IsOptional, IsString } from 'class-validator';

export class UpdateMembersDTO {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  className?: string;
}
