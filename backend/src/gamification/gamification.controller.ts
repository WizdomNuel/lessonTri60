import { Controller, Get, UseGuards } from '@nestjs/common';
import { GamificationService } from './gamification.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { CurrentUser } from '../common/decorators/current-user.decorator';

@Controller('gamification')
export class GamificationController {
  constructor(private readonly gamificationService: GamificationService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getMe(@CurrentUser() user: any) {
    const stats = await this.gamificationService.getUserStats(user.id);
    return { data: stats };
  }

  @Get('leaderboard')
  async getLeaderboard() {
    const leaderboard = await this.gamificationService.getLeaderboard();
    return { data: leaderboard };
  }
}
