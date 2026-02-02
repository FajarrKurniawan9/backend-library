import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * POST /auth/login
   * Login user and get JWT token
   */
  @Post('login')
  @ApiOperation({ summary: 'Login user and get JWT token' })
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto.username, dto.password);
  }

  /**
   * POST /auth/register
   * Register new user with associated Member
   */
  @Post('register')
  @ApiOperation({ summary: 'Register new user with associated Member' })
  register(@Body() dto: RegisterDto) {
    return this.authService.register(
      dto.username,
      dto.password,
      dto.name,
      dto.studentId,
      dto.class,
      dto.email,
      dto.phone,
      dto.role,
    );
  }
}
