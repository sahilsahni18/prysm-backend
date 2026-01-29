import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Role, TaskStatus } from '@prisma/client';

@Injectable()
export class TasksService {
  constructor(private prisma: PrismaService) {}

  async create(dto: CreateTaskDto) {
    const employee = await this.prisma.user.findUnique({
      where: { id: dto.assignedToId },
    });

    if (!employee || employee.role !== Role.EMPLOYEE) {
      throw new NotFoundException('Assigned user must be an EMPLOYEE');
    }

    const customer = await this.prisma.customer.findUnique({
      where: { id: dto.customerId },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    }

    return this.prisma.task.create({
      data: {
        title: dto.title,
        description: dto.description,
        status: dto.status,
        assignedToId: dto.assignedToId,
        customerId: dto.customerId,
      },
      include: {
        assignedTo: { select: { id: true, name: true, email: true } },
        customer: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async findAll(user: { id: number; role: Role }) {
    if (user.role === Role.ADMIN) {
      return this.prisma.task.findMany({
        include: {
          assignedTo: { select: { id: true, name: true, email: true } },
          customer: { select: { id: true, name: true, email: true } },
        },
      });
    }

    return this.prisma.task.findMany({
      where: { assignedToId: user.id },
      include: {
        customer: { select: { id: true, name: true, email: true } },
      },
    });
  }

  async updateStatus(
    taskId: number,
    status: TaskStatus,
    user: { id: number; role: Role },
  ) {
    const task = await this.prisma.task.findUnique({
      where: { id: taskId },
    });

    if (!task) {
      throw new NotFoundException('Task not found');
    }

    if (
      user.role === Role.EMPLOYEE &&
      task.assignedToId !== user.id
    ) {
      throw new ForbiddenException(
        'You can update only your assigned tasks',
      );
    }

    return this.prisma.task.update({
      where: { id: taskId },
      data: { status },
    });
  }
}
