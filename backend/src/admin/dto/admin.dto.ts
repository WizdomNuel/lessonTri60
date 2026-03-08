import { IsString, IsNotEmpty, IsOptional, IsBoolean } from 'class-validator';
import { Role } from '@prisma/client';

export class UpdateUserStatusDto {
  @IsBoolean()
  @IsNotEmpty()
  isActive: boolean;
}

export class UpdateUserRoleDto {
  @IsNotEmpty()
  role: Role;
}
