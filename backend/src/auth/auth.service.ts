import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { Role } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(pass, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.id, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        email: user.email,
        full_name: user.full_name,
        role: user.role,
      },
    };
  }

  async registerPhase1(dto: any) {
    const user = await this.usersService.create({
      ...dto,
      phase_completed: 1,
    });
    return this.login(user);
  }

  async registerPhase2(userId: string, dto: any) {
    const user = await this.usersService.update(userId, {
      ...dto,
      phase_completed: 2,
    });
    return user;
  }

  async registerPhase3(userId: string, dto: any) {
    const user = await this.usersService.update(userId, {
      ...dto,
      phase_completed: 3,
    });
    return user;
  }

  async registerPhase4(userId: string, dto: any) {
    const user = await this.usersService.update(userId, {
      ...dto,
      phase_completed: 4,
    });
    return user;
  }
}
