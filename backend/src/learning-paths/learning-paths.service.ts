import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLearningPathDto, UpdateLearningPathDto, AddCourseToPathDto } from './dto/learning-path.dto';

@Injectable()
export class LearningPathsService {
  constructor(private prisma: PrismaService) {}

  async create(createLearningPathDto: CreateLearningPathDto) {
    return this.prisma.learningPath.create({
      data: createLearningPathDto,
    });
  }

  async addCourse(pathId: string, addCourseDto: AddCourseToPathDto) {
    return this.prisma.learningPathItem.create({
      data: {
        ...addCourseDto,
        pathId,
      },
      include: {
        course: true,
      },
    });
  }

  async findAll() {
    return this.prisma.learningPath.findMany({
      include: {
        items: {
          include: {
            course: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });
  }

  async findOne(id: string) {
    const path = await this.prisma.learningPath.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            course: true,
          },
          orderBy: { order: 'asc' },
        },
      },
    });

    if (!path) {
      throw new NotFoundException(`Learning path with ID ${id} not found`);
    }

    return path;
  }

  async update(id: string, updateLearningPathDto: UpdateLearningPathDto) {
    await this.findOne(id);
    return this.prisma.learningPath.update({
      where: { id },
      data: updateLearningPathDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.learningPath.delete({
      where: { id },
    });
  }
}
