import { Injectable, NotFoundException } from '@nestjs/common';
import { member } from './member.type';
import { CreateMembersDto } from './dto/create-members.dto';

@Injectable()
export class MembersService {
  private members: member[] = [];
  private nextId = 1;

  create(dto: CreateMembersDto): member {
    const newMember: member = {
      id: this.nextId++,
      ...dto,
    };
    this.members.push(newMember);
    return newMember;
  }

  findAll(): member[] {
    return this.members;
  }

  findOne(id: number): member {
    const member = this.members.find((m) => m.id === id);
    if (!member) {
      throw new NotFoundException(`Member with ID ${id} not found`);
    }
    return member;
  }

  update(id: number, dto: Partial<CreateMembersDto>): member {
    const member = this.findOne(id);
    const updated: member = { ...member, ...(dto as Partial<member>) };
    this.members = this.members.map((m) => (m.id === id ? updated : m));
    return updated;
  }

  remove(id: number) {
    this.findOne(id);
    this.members = this.members.filter((m) => m.id !== id);
    return { message: `Member with id ${id} deleted` };
  }
}
