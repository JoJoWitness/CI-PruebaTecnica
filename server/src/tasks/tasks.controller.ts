import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException, ParseIntPipe, UseGuards, Request, ForbiddenException } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto, updateTaskDto } from './dto/task.dto';
import { Role, Task } from '@prisma/client';
import { RolesGuard } from 'src/auth/roles.guard';
import { Roles } from 'src/auth/roles.decorator';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    @UseGuards(JwtAuthGuard)
    @Get()
    async getTasks(): Promise<Task[]> {
        const tasks = await this.tasksService.tasks({});
        if (!tasks) {
            throw new NotFoundException();
        }
        return tasks;
    }

    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERVISOR) 
    @Post()
    async createTask(@Body() data: createTaskDto): Promise<Task> {
        return await this.tasksService.createTask({
            title: data.title,
            description: data.description,
            status: data.status,
            priority: data.priority,
            project: { connect: { id: data.projectId } },
            assignedTo: { connect: { id: data.assignedToId } }
        });
    }
    
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN, Role.SUPERVISOR, Role.USER) 
    @Put(':id')
    async updateTask(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: updateTaskDto,
        @Request() req,
    ): Promise<Task> {
        const task = await this.tasksService.task({ id });
        if (!task) {
            throw new NotFoundException();
        }
        // * check if user is the one assigned and allow only to change status, if not throw Forbidden
        if (req.user.role === Role.USER) {
            if ( task.assignedToId !== req.user.id ) {
                throw new ForbiddenException();
            }
            return await this.tasksService.updateTask({
                where: { id },
                data: {
                    status: data.status,
                }
            })
        }

        return await this.tasksService.updateTask({
            where: { id },
            data: {
                title: data.title,
                description: data.description,
                status: data.status,
                priority: data.priority ,
                assignedTo: data.assignedToId ? { connect: { id: data.assignedToId } } : undefined,
                //? It doesn't have sense to allow project change
            } 
        });
    }

    // TODO check why is throwing Unauthorized
    // @UseGuards(JwtAuthGuard, RolesGuard)
    // @Roles(Role.ADMIN) 
    @Delete(':id')
    async delteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        const ok = await this.tasksService.deleteTask({ id });
        if (!ok) {
            throw new NotFoundException();
        }
        return ok;
    }
}
