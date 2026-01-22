import { IsNotEmpty, IsString } from 'class-validator';

export class CreateMembersDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  className: string;
}
