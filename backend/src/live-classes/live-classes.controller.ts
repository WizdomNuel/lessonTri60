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
import { LiveClassesService } from './live-classes.service';
import { CreateLiveClassDto, UpdateLiveClassDto } from './dto/live-class.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '@prisma/client';

@Controller('live-classes')
export class LiveClassesController {
  constructor(private readonly liveClassesService: LiveClassesService) {}

  @Post()
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async create(
    @Body() createLiveClassDto: CreateLiveClassDto,
    @CurrentUser() user: any,
  ) {
    const liveClass = await this.liveClassesService.create(
      createLiveClassDto,
      user.id,
    );
    return { message: 'Live class scheduled successfully', data: liveClass };
  }

  @Get()
  async findAll(@Query('courseId') courseId: string) {
    const liveClasses = await this.liveClassesService.findAllByCourse(courseId);
    return { data: liveClasses };
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const liveClass = await this.liveClassesService.findOne(id);
    return { data: liveClass };
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async update(
    @Param('id') id: string,
    @Body() updateLiveClassDto: UpdateLiveClassDto,
  ) {
    const liveClass = await this.liveClassesService.update(
      id,
      updateLiveClassDto,
    );
    return { message: 'Live class updated successfully', data: liveClass };
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.TEACHER, Role.ADMIN)
  async remove(@Param('id') id: string) {
    await this.liveClassesService.remove(id);
    return { message: 'Live class cancelled successfully' };
  }
}
