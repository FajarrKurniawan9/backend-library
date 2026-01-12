import { Controller } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private readonly BooksService: BooksService) {}

  @Get('info')
  info() {
    return this.BooksService.getInfo();
  }

  @Get()
  findAll() {
    return { message: 'Daftar buku (sementara)' };
  }
}
