import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateCourseDto, UpdateCourseDto } from './dto/course.dto';
import { Role } from '../prisma/generated-client';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.course.findMany({
      where: { isPublished: true },
      include: {
        teacher: {
          select: {
            id: true,
            full_name: true,
            profile_photo: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        teacher: {
          select: {
            id: true,
            full_name: true,
          },
        },
        modules: {
          orderBy: { orderIndex: 'asc' },
          include: {
            lessons: {
              orderBy: { orderIndex: 'asc' },
            },
          },
        },
      },
    });

    if (!course) {
      throw new NotFoundException(`Course with ID ${id} not found`);
    }

    return course;
  }

  async create(createCourseDto: CreateCourseDto, teacherId: string) {
    return this.prisma.course.create({
      data: {
        ...createCourseDto,
        teacherId,
      },
    });
  }

  async update(id: string, updateCourseDto: UpdateCourseDto, userId: string, role: Role) {
    const course = await this.findOne(id);

    if (role !== Role.ADMIN && course.teacherId !== userId) {
      throw new ForbiddenException('You do not have permission to update this course');
    }

    return this.prisma.course.update({
      where: { id },
      data: updateCourseDto,
    });
  }

  async remove(id: string, userId: string, role: Role) {
    const course = await this.findOne(id);

    if (role !== Role.ADMIN && course.teacherId !== userId) {
      throw new ForbiddenException('You do not have permission to delete this course');
    }

    return this.prisma.course.delete({
      where: { id },
    });
  }
}
