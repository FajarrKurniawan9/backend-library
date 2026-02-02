import {
  Controller,
  Post,
  Get,
  UseGuards,
  Body,
  ParseIntPipe,
  Param,
} from '@nestjs/common';
import { TransactionsService } from './transactions.service';
import { BorrowBooksDto } from './dto/borrow-books.dto';
import { ReturnBooksDto } from './dto/return-books.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('Transactions')
@Controller('transactions')
export class TransactionsController {
  constructor(private readonly transactionsService: TransactionsService) {}

  /**
   * POST /transactions/borrow
   * Only Admin and Officer allow service the borrow books (Offline borrowing)
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OFFICER)
  @Post('borrow')
  @ApiOperation({ summary: 'Borrow books (Admin and Officer only)' })
  borrowBooks(@Body() dto: BorrowBooksDto) {
    return this.transactionsService.borrowBooks(dto);
  }

  /**
   * POST /transactions/return
   * Only Admin and Officer allow service the return books (Offline return )
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OFFICER)
  @Post('return')
  @ApiOperation({ summary: 'Return books (Admin and Officer only)' })
  returnBooks(@Body() dto: ReturnBooksDto) {
    return this.transactionsService.returnBooks(dto);
  }

  /**
   * GET /transactions
   * Accessible for Member that are logged in
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  @ApiOperation({
    summary: 'Get all transactions (Accessible for logged in Members)',
  })
  findAll() {
    return this.transactionsService.findAll();
  }
  /**
   * GET /transactions/:id
   * Accessible for Member that are logged in
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  @ApiOperation({
    summary: 'Get a transaction by ID (Accessible for logged in Members)',
  })
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.transactionsService.findOne(id);
  }
}
