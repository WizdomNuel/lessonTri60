import { IsString, IsNotEmpty, IsOptional, IsJSON } from 'class-validator';

export class CreateQuizDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsNotEmpty()
  questions: any; // Using any for Json field, in a real app we'd define an interface

  @IsString()
  @IsNotEmpty()
  lessonId: string;
}

export class UpdateQuizDto {
  @IsString()
  @IsOptional()
  title?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  questions?: any;
}
