import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { LearningPathsService } from './learning-paths.service';
import {
  CreateLearningPathDto,
  UpdateLearningPathDto,
  AddCourseToPathDto,
} from './dto/learning-path.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '../prisma/generated-client';

@Controller('learning-paths')
export class LearningPathsController {
  constructor(private readonly learningPathsService: LearningPathsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async create(@Body() createLearningPathDto: CreateLearningPathDto) {
    const path = await this.learningPathsService.create(createLearningPathDto);
    return { message: 'Learning path created successfully', data: path };
  }

  @Post(':id/courses')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async addCourse(
    @Param('id') id: string,
    @Body() addCourseDto: AddCourseToPathDto,
  ) {
    const item = await this.learningPathsService.addCourse(id, addCourseDto);
    return { message: 'Course added to path', data: item };
  }

  @Get()
  async findAll() {
    const paths = await this.learningPathsService.findAll();
    return { data: paths };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const path = await this.learningPathsService.findOne(id);
    return { data: path };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateLearningPathDto: UpdateLearningPathDto,
  ) {
    const path = await this.learningPathsService.update(
      id,
      updateLearningPathDto,
    );
    return { message: 'Learning path updated successfully', data: path };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.ADMIN)
  async remove(@Param('id') id: string) {
    await this.learningPathsService.remove(id);
    return { message: 'Learning path deleted successfully' };
  }
}
