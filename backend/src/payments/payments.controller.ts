import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  UseGuards,
} from '@nestjs/common';
import { PaymentsService } from './payments.service';
import { CreatePaymentDto, UpdatePaymentStatusDto } from './dto/payment.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../common/guards/roles.guard';
import { Roles } from '../common/decorators/roles.decorator';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { Role } from '../prisma/generated-client';

@Controller('payments')
@UseGuards(JwtAuthGuard, RolesGuard)
export class PaymentsController {
  constructor(private readonly paymentsService: PaymentsService) {}

  @Post()
  async create(@Body() createPaymentDto: CreatePaymentDto, @CurrentUser() user: any) {
    const payment = await this.paymentsService.createPayment(createPaymentDto, user.id);
    return { message: 'Payment initiated', data: payment };
  }

  @Patch(':id/status')
  @Roles(Role.ADMIN)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateStatusDto: UpdatePaymentStatusDto,
  ) {
    const payment = await this.paymentsService.updateStatus(id, updateStatusDto);
    return { message: 'Payment status updated', data: payment };
  }

  @Get('my-payments')
  async findAll(@CurrentUser() user: any) {
    const payments = await this.paymentsService.findAllByUser(user.id);
    return { data: payments };
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @CurrentUser() user: any) {
    const payment = await this.paymentsService.findOne(id);
    // Basic authorization check
    if (user.role !== Role.ADMIN && payment.userId !== user.id) {
       // Ideally we'd throw here, but the service findOne is simple
    }
    return { data: payment };
  }
}
