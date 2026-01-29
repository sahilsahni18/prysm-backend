import { IsEnum, IsInt, IsOptional, IsString } from 'class-validator';
import { TaskStatus } from '@prisma/client';

export class CreateTaskDto {
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsInt()
  assignedToId: number;

  @IsInt()
  customerId: number;

  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}
