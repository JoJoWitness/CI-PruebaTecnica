import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, ParseIntPipe, UseGuards, ForbiddenException, Request } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project, Role } from '@prisma/client';
import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';
import { Roles } from 'src/auth/roles.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async projects(): Promise<Project[]> {
        const projects = await this.projectsService.projects({});
        if (!projects) {
            throw new NotFoundException();
        }
        return projects
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERVISOR)
    @Post()
    async createProject(@Body() data: CreateProjectDto): Promise<Project> {
        const users = data.assignedUsersID.map((id) => ({ id })) || [];

        return await this.projectsService.createProject({
            name: data.name,
            description: data.description,
            owner: { connect: { id: data.ownerId } },
            assignedUsers: { connect: users },
            status: data.status,
            tasks: {}
        });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERVISOR)
    @Put(':id')
    async updateProject(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateProjectDto,
        @Request() req,
    ): Promise<Project> {
        const users = data.assignedUsersID.map((id) => ({ id })) || [];

        const project = await this.projectsService.project({ id });
        if (!project) {
            throw new NotFoundException();
        }
        // *check if supervisor is the owner, if not throw Forbidden
        if (
            req.user.role === Role.SUPERVISOR
            && project.ownerId !== data.ownerId
        ) {
            throw new ForbiddenException();
        }

        return await this.projectsService.updateProject({
            where: { id },
            data: { 
                name: data.name,
                description: data.description,
                owner: data.ownerId ? { connect: { id: data.ownerId } } : undefined,
                assignedUsers: {
                    set: users
                },
            }
        });
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Delete(':id')
    async deleteProject(@Param('id', ParseIntPipe) id: number): Promise<Project> {
        const ok = await this.projectsService.deleteProject({ id });
        if (!ok) {
            throw new NotFoundException();
        }
        return ok;
    }
}