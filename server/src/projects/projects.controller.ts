import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { Project } from '@prisma/client';


import { CreateProjectDto, UpdateProjectDto } from './dto/project.dto';



@Controller('projects')
export class ProjectsController {
    constructor(private readonly projectsService: ProjectsService) { }

    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN) 
    @Get()
    async projects(): Promise<Project[]> {
        const projects = await this.projectsService.projects({});
        if (!projects) {
            throw new NotFoundException();
        }
        return projects
    }

    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN, Role.SUPERVISOR) 
    @Post()
    async createProject(@Body() data: CreateProjectDto): Promise<Project> {
   
    console.log("Incoming data:", data);

  
    const users = (data.assignedUsersID || []).map((id) => ({ id }));

    return await this.projectsService.createProject({
        name: data.name,
        description: data.description,
        owner: { connect: { id: data.ownerId } }, 
        assignedUsers: { connect: users },
        status: data.status,
        tasks: {}
    });
    }

    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN, Role.SUPERVISOR) //Supervisor if owner
    @Put()
    async updateProject(@Body() data: UpdateProjectDto): Promise<Project> {
        const users = data.assignedUsersID.map((id) => ({ id })) || [];
        
        return await this.projectsService.updateProject({
            where: { id: data.id },
            data: {
                ...data,
                owner: data.ownerId ? { connect: { id: data.ownerId } } : undefined,
                assignedUsers: {
                    set: users
                },
            }
        });
    }

    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN) 
    @Delete(':id')
    async deleteProject(@Param('id', ParseIntPipe) id: number): Promise<Project> {
        const ok = await this.projectsService.deleteProject({ id });
        if (!ok) {
            throw new NotFoundException();
        }
        return ok;
    }
}