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
import { AssignmentsService } from './assignments.service';
import {
  CreateAssignmentDto,
  UpdateAssignmentDto,
  CreateSubmissionDto,
  GradeSubmissionDto,
} from './dto/assignment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '../prisma/generated-client';

@Controller('assignments')
export class AssignmentsController {
  constructor(private readonly assignmentsService: AssignmentsService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async create(@Body() createAssignmentDto: CreateAssignmentDto) {
    const assignment = await this.assignmentsService.create(createAssignmentDto);
    return { message: 'Assignment created successfully', data: assignment };
  }

  @Get()
  async findAll(@Query('lessonId') lessonId: string) {
    const assignments = await this.assignmentsService.findAllByLesson(lessonId);
    return { data: assignments };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const assignment = await this.assignmentsService.findOne(id);
    return { data: assignment };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateAssignmentDto: UpdateAssignmentDto,
  ) {
    const assignment = await this.assignmentsService.update(id, updateAssignmentDto);
    return { message: 'Assignment updated successfully', data: assignment };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async remove(@Param('id') id: string) {
    await this.assignmentsService.remove(id);
    return { message: 'Assignment deleted successfully' };
  }

  // Submission endpoints
  @Post(':id/submissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.STUDENT)
  async submit(
    @Param('id') id: string,
    @Body() createSubmissionDto: CreateSubmissionDto,
    @CurrentUser() user: any,
  ) {
    const submission = await this.assignmentsService.createSubmission(
      { ...createSubmissionDto, assignmentId: id },
      user.id,
    );
    return { message: 'Assignment submitted successfully', data: submission };
  }

  @Get(':id/submissions')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async viewSubmissions(@Param('id') id: string) {
    const submissions = await this.assignmentsService.findAllSubmissions(id);
    return { data: submissions };
  }

  @Patch('submissions/:submissionId/grade')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async grade(
    @Param('submissionId') submissionId: string,
    @Body() gradeSubmissionDto: GradeSubmissionDto,
  ) {
    const submission = await this.assignmentsService.gradeSubmission(
      submissionId,
      gradeSubmissionDto,
    );
    return { message: 'Submission graded successfully', data: submission };
  }
}
