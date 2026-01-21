import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
  ) {}

  async register(username: string, password: string, memberId: number) {
    const existingUser = await this.prisma.user.findUnique({
      where: { username },
    });
    if (existingUser) {
      throw new UnauthorizedException('Username sudah digunakan');
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await this.prisma.user.create({
      data: {
        username,
        password: hashedPassword,
        role: 'MEMBER',
        memberId,
      },
    });
    return { message: 'Registrasi berhasil', userId: user.id };
  }

  async login(username: string, password: string) {
    const user = await this.prisma.user.findUnique({
      where: { username },
      include: { member: true },
    });
    if (!user) {
      throw new UnauthorizedException('User tidak ditemukan');
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException('Password salah');
    }
    const payload = {
      sub: user.id,
      username: user.username,
      role: user.role,
      memberId: user.memberId,
    };
    return {
      message: 'Login berhasil',
      access_token: this.jwtService.sign(payload),
    };
  }
}
