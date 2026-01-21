import { IsNotEmpty, IsDate, IsNumber } from 'class-validator';

export class BorrowBooksDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  membersId: number;

  @IsNotEmpty()
  @IsDate()
  returnDate: Date;
}
