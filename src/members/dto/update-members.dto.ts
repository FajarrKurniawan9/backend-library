import { IsOptional, IsString, IsEmail, IsEnum } from 'class-validator';
import { MemberType } from '@prisma/client';
export class UpdateMembersDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  studentId?: string;

  @IsString()
  @IsOptional()
  class?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEnum(MemberType)
  @IsOptional()
  memberType?: MemberType;
}
