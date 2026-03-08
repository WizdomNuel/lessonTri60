import { IsString, IsNotEmpty, IsOptional, IsInt, IsArray, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateLearningPathDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class UpdateLearningPathDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;
}

export class AddCourseToPathDto {
  @IsString()
  @IsNotEmpty()
  courseId: string;

  @IsInt()
  @IsNotEmpty()
  order: number;
}
