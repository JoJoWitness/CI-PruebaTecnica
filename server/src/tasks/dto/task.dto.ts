import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { TaskStatus, TaskPriority } from "@prisma/client";

export class createTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    projectId: number;
    
    @IsNumber()
    @IsNotEmpty()
    assignedToId: number;

    @IsEnum(TaskStatus)
    @IsNotEmpty()
    status: TaskStatus;

    @IsEnum(TaskPriority)
    @IsNotEmpty()
    priority: TaskPriority
}

export class updateTaskDto {
    // @IsNumber()
    // id: number;

    @IsString()
    @IsOptional()
    title?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    projectId?: number;
    
    @IsNumber()
    @IsOptional()
    assignedToId?: number;

    @IsEnum(TaskStatus)
    @IsOptional()
    status?: TaskStatus;

    @IsEnum(TaskPriority)
    @IsOptional()
    priority?: TaskPriority
}