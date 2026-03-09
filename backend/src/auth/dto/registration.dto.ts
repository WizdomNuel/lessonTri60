import { IsEmail, IsEnum, IsNotEmpty, IsOptional, IsString, IsArray, IsNumber, MinLength } from 'class-validator';
import { Role } from '@prisma/client';

export class Phase1RegistrationDto {
  @IsNotEmpty()
  @IsString()
  full_name: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;

  @IsEnum(Role)
  role: Role;
}

export class Phase2RegistrationDto {
  // Student fields
  @IsOptional()
  @IsString()
  class_level?: string;

  @IsOptional()
  @IsString()
  school_type?: string;

  @IsOptional()
  @IsString()
  preferred_learning_style?: string;

  @IsOptional()
  @IsString()
  learning_goals?: string;

  // Teacher fields
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjects?: string[];

  @IsOptional()
  @IsString()
  qualification?: string;

  @IsOptional()
  @IsString()
  years_of_experience?: string;

  @IsOptional()
  @IsString()
  teaching_method?: string;
}

export class Phase3RegistrationDto {
  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  subjects_of_interest?: string[];

  @IsOptional()
  @IsArray()
  @IsString({ each: true })
  skills_to_improve?: string[];

  @IsOptional()
  @IsString()
  challenge_level?: string;

  @IsOptional()
  notification_preferences?: any;
}

export class Phase4RegistrationDto {
  @IsOptional()
  @IsString()
  profile_photo?: string;

  @IsOptional()
  @IsString()
  bio?: string;

  @IsOptional()
  social_links?: any;

  // Teacher specific
  @IsOptional()
  @IsString()
  certificate_upload?: string;

  @IsOptional()
  @IsString()
  cv_upload?: string;
}
