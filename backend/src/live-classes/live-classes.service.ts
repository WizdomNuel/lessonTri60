import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateLiveClassDto, UpdateLiveClassDto } from './dto/live-class.dto';

@Injectable()
export class LiveClassesService {
  constructor(private prisma: PrismaService) {}

  async create(createLiveClassDto: CreateLiveClassDto, teacherId: string) {
    return this.prisma.liveClass.create({
      data: {
        ...createLiveClassDto,
        teacherId,
      },
    });
  }

  async findAllByCourse(courseId: string) {
    return this.prisma.liveClass.findMany({
      where: { courseId },
      include: {
        teacher: {
          select: {
            id: true,
            full_name: true,
          },
        },
      },
      orderBy: { startTime: 'asc' },
    });
  }

  async findOne(id: string) {
    const liveClass = await this.prisma.liveClass.findUnique({
      where: { id },
      include: {
        teacher: true,
      },
    });

    if (!liveClass) {
      throw new NotFoundException(`Live class with ID ${id} not found`);
    }

    return liveClass;
  }

  async update(id: string, updateLiveClassDto: UpdateLiveClassDto) {
    await this.findOne(id);
    return this.prisma.liveClass.update({
      where: { id },
      data: updateLiveClassDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.liveClass.delete({
      where: { id },
    });
  }
}
