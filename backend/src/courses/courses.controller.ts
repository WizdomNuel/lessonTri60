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
import { CoursesService } from './courses.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '../prisma/generated-client';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService) {}

  @Get()
  async findAll() {
    const courses = await this.coursesService.findAll();
    return { data: courses };
  }

  @Get('enrolled')
  @UseGuards(JwtAuthGuard)
  async findEnrolled(@CurrentUser() user: any) {
    const courses = await this.coursesService.findEnrolled(user.id);
    return { data: courses };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const course = await this.coursesService.findOne(id);
    return { data: course };
  }

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async create(@Body() createCourseDto: CreateCourseDto, @CurrentUser() user: any) {
    const course = await this.coursesService.create(createCourseDto, user.id);
    return { message: 'Course created successfully', data: course };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateCourseDto: UpdateCourseDto,
    @CurrentUser() user: any,
  ) {
    const course = await this.coursesService.update(
      id,
      updateCourseDto,
      user.id,
      user.role,
    );
    return { message: 'Course updated successfully', data: course };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async remove(@Param('id') id: string, @CurrentUser() user: any) {
    await this.coursesService.remove(id, user.id, user.role);
    return { message: 'Course deleted successfully' };
  }
}
