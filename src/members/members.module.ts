import { Module } from '@nestjs/common';
import { MemberController } from './members.controller';
import { MemberService } from './members.service';
import { PrismaModule } from '../prisma/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [MemberController],
  providers: [MemberService],
})
export class MembersModule {}
