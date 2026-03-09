import { Controller, Post, Body, UnauthorizedException, HttpCode, HttpStatus, UseGuards, Req } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guards/jwt-auth.guard';
import { Phase1RegistrationDto, Phase2RegistrationDto, Phase3RegistrationDto, Phase4RegistrationDto } from './dto/registration.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() body: any) {
    const user = await this.authService.validateUser(body.email, body.password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @Post('register/phase1')
  async registerPhase1(@Body() dto: Phase1RegistrationDto) {
    return this.authService.registerPhase1(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register/phase2')
  async registerPhase2(@Req() req: any, @Body() dto: Phase2RegistrationDto) {
    return this.authService.registerPhase2(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register/phase3')
  async registerPhase3(@Req() req: any, @Body() dto: Phase3RegistrationDto) {
    return this.authService.registerPhase3(req.user.id, dto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('register/phase4')
  async registerPhase4(@Req() req: any, @Body() dto: Phase4RegistrationDto) {
    return this.authService.registerPhase4(req.user.id, dto);
  }
}
