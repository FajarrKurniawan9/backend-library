import { IsNotEmpty, IsUUID, IsDate } from 'class-validator';

export class ReturnBooksDto {
  @IsUUID()
  @IsNotEmpty()
  bookId: number;

  @IsUUID()
  @IsNotEmpty()
  membersId: number;

  @IsNotEmpty()
  @IsDate()
  borrowDate: Date;
}
