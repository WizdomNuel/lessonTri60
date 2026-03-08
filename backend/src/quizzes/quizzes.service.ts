import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateQuizDto, UpdateQuizDto } from './dto/quiz.dto';
import { GamificationService } from '../gamification/gamification.service';

@Injectable()
export class QuizzesService {
  constructor(
    private prisma: PrismaService,
    private gamificationService: GamificationService,
  ) {}

  async submitQuiz(quizId: string, userId: string) {
    const quiz = await this.findOne(quizId);
    
    // Award 100 points for completing a quiz
    await this.gamificationService.addPoints(userId, {
      points: 100,
      reason: `COMPLETED_QUIZ_${quizId}`,
    });

    return { message: 'Quiz submitted and 100 points awarded' };
  }

  async create(createQuizDto: CreateQuizDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: createQuizDto.lessonId },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${createQuizDto.lessonId} not found`);
    }

    return this.prisma.quiz.create({
      data: createQuizDto,
    });
  }

  async findAllByLesson(lessonId: string) {
    return this.prisma.quiz.findMany({
      where: { lessonId },
    });
  }

  async findOne(id: string) {
    const quiz = await this.prisma.quiz.findUnique({
      where: { id },
    });

    if (!quiz) {
      throw new NotFoundException(`Quiz with ID ${id} not found`);
    }

    return quiz;
  }

  async update(id: string, updateQuizDto: UpdateQuizDto) {
    await this.findOne(id);
    return this.prisma.quiz.update({
      where: { id },
      data: updateQuizDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.quiz.delete({
      where: { id },
    });
  }
}
