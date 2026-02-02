import { Injectable, NotFoundException } from '@nestjs/common';
import { BorrowBooksDto } from './dto/borrow-books.dto';
import { ReturnBooksDto } from './dto/return-books.dto';
import { PrismaService } from '../prisma/prisma.service';
import { TransactionStatus } from '@prisma/client';
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

    const member = await this.prisma.member.findUnique({
      where: { id: dto.memberId },
    });
    if (!member) {
      throw new NotFoundException(`Member with ID ${dto.memberId} not found`);
    }

    const transaction = await this.prisma.transaction.create({
      data: {
        bookId: dto.bookId,
        memberId: dto.memberId,
        dueDate: dto.dueDate,
        status: TransactionStatus.BORROWED,
      },
      include: {
        book: true,
        member: true,
      },
    });

    await this.prisma.book.update({
      where: { id: dto.bookId },
      data: { stock: book.stock - 1 },
    });

    return { message: 'Book borrowed successfully', transaction };
  }

  async returnBooks(dto: ReturnBooksDto) {
    const transaction = await this.prisma.transaction.findFirst({
      where: {
        bookId: dto.bookId,
        memberId: dto.memberId,
        status: TransactionStatus.BORROWED,
      },
      include: { book: true, member: true },
    });

    if (!transaction) {
      throw new NotFoundException(
        `No active borrow transaction found for Book ID ${dto.bookId} and Member ID ${dto.memberId}`,
      );
    }

    const updatedTransaction = await this.prisma.transaction.update({
      where: { id: transaction.id },
      data: {
        returnDate: new Date(),
        status: TransactionStatus.RETURNED,
      },
      include: { book: true, member: true },
    });

    await this.prisma.book.update({
      where: { id: dto.bookId },
      data: { stock: updatedTransaction.book.stock + 1 },
    });
    return {
      message: 'Book returned successfully',
      transaction: updatedTransaction,
    };
  }
  async findAll() {
    return this.prisma.transaction.findMany({
      orderBy: { id: 'desc' },
      include: {
        book: true,
        member: true,
      },
    });
  }

  async findOne(id: number) {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
      include: {
        book: true,
        member: true,
      },
    });

    if (!transaction) {
      throw new NotFoundException(`Transaction with ID ${id} not found`);
    }

    return transaction;
  }
}
