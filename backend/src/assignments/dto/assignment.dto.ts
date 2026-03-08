import { IsString, IsNotEmpty, IsOptional, IsInt, IsDateString } from 'class-validator';

export class CreateAssignmentDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsInt()
  @IsOptional()
  points?: number;

  @IsString()
  @IsNotEmpty()
  lessonId: string;
}

export class UpdateAssignmentDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  dueDate?: string;

  @IsInt()
  @IsOptional()
  points?: number;
}

export class CreateSubmissionDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsString()
  @IsNotEmpty()
  assignmentId: string;
}

export class GradeSubmissionDto {
  @IsInt()
  @IsNotEmpty()
  grade: number;

  @IsString()
  @IsOptional()
  feedback?: string;
}
