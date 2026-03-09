import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { AddPointsDto, UnlockAchievementDto } from './dto/gamification.dto';

@Injectable()
export class GamificationService {
  constructor(private prisma: PrismaService) {}

  async addPoints(userId: string, addPointsDto: AddPointsDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const newTotalPoints = user.totalPoints + addPointsDto.points;
    const newLevel = Math.floor(newTotalPoints / 1000) + 1;

    // Update user points and level
    await this.prisma.user.update({
      where: { id: userId },
      data: {
        totalPoints: newTotalPoints,
        level: newLevel,
      },
    });

    // Create transaction record
    return this.prisma.pointTransaction.create({
      data: {
        ...addPointsDto,
        userId,
      },
    });
  }

  async unlockAchievement(userId: string, unlockAchievementDto: UnlockAchievementDto) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    // Check if already unlocked
    const existing = await this.prisma.achievement.findFirst({
      where: { userId, name: unlockAchievementDto.name },
    });

    if (existing) {
      return existing;
    }

    return this.prisma.achievement.create({
      data: {
        ...unlockAchievementDto,
        userId,
      },
    });
  }

  async getUserStats(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: {
        totalPoints: true,
        level: true,
        achievements: true,
        pointHistory: {
          take: 10,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    return {
      ...user,
      points: user.totalPoints,
    };
  }

  async getLeaderboard() {
    const users = await this.prisma.user.findMany({
      take: 10,
      orderBy: { totalPoints: 'desc' },
      select: {
        id: true,
        full_name: true,
        totalPoints: true,
        level: true,
        profile_photo: true,
      },
    });

    return users.map((user, index) => ({
      rank: index + 1,
      studentId: user.id,
      studentName: user.full_name,
      points: user.totalPoints,
      level: user.level,
      profile_photo: user.profile_photo,
    }));
  }
}
