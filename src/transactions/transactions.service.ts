import { Injectable, NotFoundException } from '@nestjs/common';
import { BorrowBooksDto } from './dto/borrow-books.dto';
import { ReturnBooksDto } from './dto/return-books.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class TransactionsService {
  constructor(private prisma: PrismaService) {}
  async borrowBooks(dto: BorrowBooksDto) {
    const book = await this.prisma.book.findUnique({
      where: { id: dto.bookId },
    });
    if (!book || book.stock <= 0) {
      throw new NotFoundException(
        `Book with ID ${dto.bookId} not found or out of stock`,
      );
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        bookId: dto.bookId,
        memberId: dto.membersId,
        returnDate: dto.returnDate,
        status: 'borrow',
      },
      include: { book: true },
    });

    await this.prisma.book.update({
      where: { id: dto.bookId },
      data: { stock: book.stock - 1 },
    });

    return transaction;
  }

  async returnBooks(dto: ReturnBooksDto) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        bookId: dto.bookId,
        memberId: dto.membersId,
        status: 'borrow',
      },
    });

    if (!transaction) {
      throw new NotFoundException(
        `No active borrow transaction found for Book ID ${dto.bookId} and Member ID ${dto.membersId}`,
      );
    }

    await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: { status: 'returned', returnDate: new Date() },
    });

    const book = await this.prisma.book.findUnique({
      where: { id: dto.bookId },
    });

    await this.prisma.book.update({
      where: { id: dto.bookId },
      data: { stock: book.stock + 1 },
    });
    return { message: 'Book returned successfully' };
  }
}
