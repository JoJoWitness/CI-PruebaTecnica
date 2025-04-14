import { ProjectStatus } from '@prisma/client';
import { IsArray, IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsNotEmpty()
    ownerId: number;

    @IsArray()
    @IsNotEmpty()
    @IsNumber({}, { each: true })
    assignedUsersID: number[];

    @IsEnum(ProjectStatus)
    projectStatus: ProjectStatus;
}

export class UpdateProjectDto {
    @IsNumber()
    @IsOptional()
    id: number

    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    description?: string;

    @IsNumber()
    @IsOptional()
    ownerId?: number;

    @IsArray()
    @IsNumber({}, { each: true })
    @IsOptional()
    assignedUsersID?: number[];

    @IsEnum(ProjectStatus)
    projectStatus: ProjectStatus;
}