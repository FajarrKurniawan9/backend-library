import {
  Controller,
  Body,
  Delete,
  Put,
  Post,
  Get,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';
import { MembersService } from './members.service';
import { CreateMembersDto } from './dto/create-members.dto';
import { UpdateMembersDto } from './dto/update-members.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { UserRole } from '@prisma/client';

@Controller('members')
export class MembersController {
  constructor(private readonly membersService: MembersService) {}

  /**
   * POST /members
   * Only Admin and Officer can create new members
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OFFICER)
  @Post()
  create(@Body() dto: CreateMembersDto) {
    return this.membersService.create(dto);
  }

  /**
   * GET /members
   * Accessible for Member that are logged in
   */
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.membersService.findAll();
  }

  /**
   * GET /members/:id
   * Accessible for Member that are logged in
   */
  @UseGuards(JwtAuthGuard)
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.findOne(id);
  }

  /**
   * PUT /members/:id
   * Only Admin and Officer can update members
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OFFICER)
  @Put(':id')
  update(@Param('id', ParseIntPipe) id: number, @Body() dto: UpdateMembersDto) {
    return this.membersService.update(id, dto);
  }

  /**
   * DELETE /members/:id
   * Only Admin and Officer can delete members
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(UserRole.ADMIN, UserRole.OFFICER)
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.membersService.remove(id);
  }
}
