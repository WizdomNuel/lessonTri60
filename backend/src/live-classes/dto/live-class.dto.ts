import { IsString, IsNotEmpty, IsOptional, IsDateString, IsInt } from 'class-validator';

export class CreateLiveClassDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsNotEmpty()
  startTime: string;

  @IsInt()
  @IsNotEmpty()
  duration: number;

  @IsString()
  @IsNotEmpty()
  meetingLink: string;

  @IsString()
  @IsNotEmpty()
  courseId: string;
}

export class UpdateLiveClassDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  @IsOptional()
  startTime?: string;

  @IsInt()
  @IsOptional()
  duration?: number;

  @IsString()
  @IsOptional()
  meetingLink?: string;

  @IsString()
  @IsOptional()
  status?: string;
}
