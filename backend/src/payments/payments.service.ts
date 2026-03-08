import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePaymentDto, UpdatePaymentStatusDto } from './dto/payment.dto';
import { PaymentStatus } from '@prisma/client';

@Injectable()
export class PaymentsService {
  constructor(private prisma: PrismaService) {}

  async createPayment(createPaymentDto: CreatePaymentDto, userId: string) {
    return this.prisma.payment.create({
      data: {
        ...createPaymentDto,
        userId,
      },
    });
  }

  async updateStatus(id: string, updateStatusDto: UpdatePaymentStatusDto) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    const updatedPayment = await this.prisma.payment.update({
      where: { id },
      data: { status: updateStatusDto.status },
    });

    // If payment is completed and linked to a course, create an enrollment
    if (updateStatusDto.status === PaymentStatus.COMPLETED && payment.courseId) {
      await this.prisma.enrollment.upsert({
        where: {
          userId_courseId: {
            userId: payment.userId,
            courseId: payment.courseId,
          },
        },
        update: {
          lastAccessAt: new Date(),
        },
        create: {
          userId: payment.userId,
          courseId: payment.courseId,
        },
      });
    }

    return updatedPayment;
  }

  async findAllByUser(userId: string) {
    return this.prisma.payment.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const payment = await this.prisma.payment.findUnique({
      where: { id },
    });

    if (!payment) {
      throw new NotFoundException(`Payment with ID ${id} not found`);
    }

    return payment;
  }
}
