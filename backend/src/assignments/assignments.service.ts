import { Injectable, NotFoundException, ForbiddenException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAssignmentDto, UpdateAssignmentDto, CreateSubmissionDto, GradeSubmissionDto } from './dto/assignment.dto';

@Injectable()
export class AssignmentsService {
  constructor(private prisma: PrismaService) {}

  async create(createAssignmentDto: CreateAssignmentDto) {
    const lesson = await this.prisma.lesson.findUnique({
      where: { id: createAssignmentDto.lessonId },
    });

    if (!lesson) {
      throw new NotFoundException(`Lesson with ID ${createAssignmentDto.lessonId} not found`);
    }

    return this.prisma.assignment.create({
      data: createAssignmentDto,
    });
  }

  async findAllByLesson(lessonId: string) {
    return this.prisma.assignment.findMany({
      where: { lessonId },
    });
  }

  async findOne(id: string) {
    const assignment = await this.prisma.assignment.findUnique({
      where: { id },
      include: {
        submissions: true,
      },
    });

    if (!assignment) {
      throw new NotFoundException(`Assignment with ID ${id} not found`);
    }

    return assignment;
  }

  async update(id: string, updateAssignmentDto: UpdateAssignmentDto) {
    await this.findOne(id);
    return this.prisma.assignment.update({
      where: { id },
      data: updateAssignmentDto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.assignment.delete({
      where: { id },
    });
  }

  // Submission logic
  async createSubmission(createSubmissionDto: CreateSubmissionDto, studentId: string) {
    const assignment = await this.findOne(createSubmissionDto.assignmentId);
    
    // Check if student is enrolled (omitted for now for simplicity, would use Enrollments table)
    
    return this.prisma.submission.create({
      data: {
        ...createSubmissionDto,
        studentId,
      },
    });
  }

  async findAllSubmissions(assignmentId: string) {
    return this.prisma.submission.findMany({
      where: { assignmentId },
      include: {
        student: {
          select: {
            id: true,
            full_name: true,
          },
        },
      },
    });
  }

  async gradeSubmission(submissionId: string, gradeSubmissionDto: GradeSubmissionDto) {
    const submission = await this.prisma.submission.findUnique({
      where: { id: submissionId },
    });

    if (!submission) {
      throw new NotFoundException(`Submission with ID ${submissionId} not found`);
    }

    return this.prisma.submission.update({
      where: { id: submissionId },
      data: {
        ...gradeSubmissionDto,
        status: 'GRADED',
      },
    });
  }
}
