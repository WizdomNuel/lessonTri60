import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Query,
} from '@nestjs/common';
import { QuizzesService } from './quizzes.service';
import { CreateQuizDto, UpdateQuizDto } from './dto/quiz.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '../prisma/generated-client';

@Controller('quizzes')
export class QuizzesController {
  constructor(private readonly quizzesService: QuizzesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async create(@Body() createQuizDto: CreateQuizDto) {
    const quiz = await this.quizzesService.create(createQuizDto);
    return { message: 'Quiz created successfully', data: quiz };
  }

  @Get()
  async findAll(@Query('lessonId') lessonId: string) {
    const quizzes = await this.quizzesService.findAllByLesson(lessonId);
    return { data: quizzes };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const quiz = await this.quizzesService.findOne(id);
    return { data: quiz };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async update(@Param('id') id: string, @Body() updateQuizDto: UpdateQuizDto) {
    const quiz = await this.quizzesService.update(id, updateQuizDto);
    return { message: 'Quiz updated successfully', data: quiz };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async remove(@Param('id') id: string) {
    await this.quizzesService.remove(id);
    return { message: 'Quiz deleted successfully' };
  }

  @Post(':id/submit')
  @UseGuards(JwtAuthGuard)
  async submit(@Param('id') id: string, @CurrentUser() user: any) {
    return this.quizzesService.submitQuiz(id, user.id);
  }
}
