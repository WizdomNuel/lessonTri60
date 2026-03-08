import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserStatusDto, UpdateUserRoleDto } from './dto/admin.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { Role } from '@prisma/client';

@Controller('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(Role.ADMIN)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get('stats')
  async getStats() {
    const stats = await this.adminService.getSystemStats();
    return { data: stats };
  }

  @Get('users')
  async getUsers() {
    const users = await this.adminService.getAllUsers();
    return { data: users };
  }

  @Patch('users/:id/status')
  async updateStatus(
    @Param('id') id: string,
    @Body() updateUserStatusDto: UpdateUserStatusDto,
  ) {
    const user = await this.adminService.updateUserStatus(
      id,
      updateUserStatusDto,
    );
    return { message: 'User status updated', data: user };
  }

  @Patch('users/:id/role')
  async updateRole(
    @Param('id') id: string,
    @Body() updateUserRoleDto: UpdateUserRoleDto,
  ) {
    const user = await this.adminService.updateUserRole(id, updateUserRoleDto);
    return { message: 'User role updated', data: user };
  }
}
