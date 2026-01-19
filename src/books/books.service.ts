import { Injectable, NotFoundException } from '@nestjs/common';
import { Book } from './book.type';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class BooksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateBookDto) {
    return this.prisma.book.create({ data: dto });
  }

  async findAll(): Promise<Book[]> {
    return this.prisma.book.findMany({ orderBy: { id: 'asc' } });
  }

  async findOne(id: number): Promise<Book> {
    const book = await this.prisma.book.findUnique({ where: { id } });
    if (!book) {
      throw new NotFoundException(`Book with ID ${id} not found`);
    }
    return book;
  }

  async update(id: number, dto: UpdateBookDto) {
    await this.findOne(id);
    return this.prisma.book.update({ where: { id }, data: dto });
  }

  async remove(id: number) {
    await this.findOne(id);
    await this.prisma.book.delete({ where: { id } });
    return { message: `Book with id ${id} deleted` };
  }
}
