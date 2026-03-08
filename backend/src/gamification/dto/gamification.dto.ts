import { IsString, IsNotEmpty, IsNumber, IsOptional } from 'class-validator';

export class AddPointsDto {
  @IsNumber()
  @IsNotEmpty()
  points: number;

  @IsString()
  @IsNotEmpty()
  reason: string;
}

export class UnlockAchievementDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsString()
  @IsOptional()
  icon?: string;
}
