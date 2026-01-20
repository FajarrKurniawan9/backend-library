import { IsNotEmpty, IsUUID, IsDate } from 'class-validator';

export class BorrowBooksDto {
  @IsUUID()
  @IsNotEmpty()
  bookId: number;

  @IsUUID()
  @IsNotEmpty()
  membersId: number;

  @IsNotEmpty()
  @IsDate()
  returnDate: Date;
}
