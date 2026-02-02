import { IsNotEmpty, IsDateString, IsNumber } from 'class-validator';

export class BorrowBooksDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNumber()
  @IsNotEmpty()
  memberId: number;

  @IsNotEmpty()
  @IsDateString()
  dueDate: string;
}
