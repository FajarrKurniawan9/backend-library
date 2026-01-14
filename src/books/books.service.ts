import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.type';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Injectable()
export class BooksService {
  private books: Book[] = [];
  private nextId = 1;

  create(dto: CreateBookDto): Book {
    const newBook: Book = {
      id: this.nextId++,
      ...dto,
    };
    this.books.push(newBook);
    return newBook;
  }

  findAll(): Book[] {
    return this.books;
  }

  findOne(id: number): Book {
    const book = this.books.find((b) => b.id === id);
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  update(id: number, dto: UpdateBookDto): Book {
    const book = this.findOne(id);
    const updated: Book = { ...book, ...(dto as Partial<Book>) };
    this.books = this.books.map((b) => (b.id === id ? updated : b));
    return updated;
  }

  remove(id: number) {
    this.findOne(id);
    this.books = this.books.filter((b) => b.id !== id);
    return { message: `Book with id ${id} deleted` };
  }
}
