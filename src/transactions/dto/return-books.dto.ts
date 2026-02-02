import { IsNotEmpty, IsNumber } from 'class-validator';

export class ReturnBooksDto {
  @IsNotEmpty()
  @IsNumber()
  bookId: number;

  @IsNotEmpty()
  @IsNumber()
  memberId: number;
}
