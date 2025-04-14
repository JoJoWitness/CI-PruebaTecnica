import { Controller, Get, Post, Body, Patch, Param, Delete, Put, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { createTaskDto, updateTaskDto } from './dto/task.dto';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TasksController {
    constructor(private readonly tasksService: TasksService) { }

    // TODO: Add Guard
    // @UseGuards(JwtAuthGuard)
    @Get()
    async getTasks(): Promise<Task[]> {
        const tasks = await this.tasksService.tasks({});
        if (!tasks) {
            throw new NotFoundException();
        }
        return tasks;
    }

    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN, Role.SUPERVISOR) 
    @Post()
    async createTask(@Body() data: createTaskDto): Promise<Task> {
        return await this.tasksService.createTask({
            ...data,
            project: { connect: { id: data.projectId } },
            assignedTo: { connect: { id: data.assignedToId } }
        });
    }
    
    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN, Role.SUPERVISOR, Role.USER) // user solo si es dueño
    @Put()
    async updateTask(@Body() data: updateTaskDto): Promise<Task> {
        return await this.tasksService.updateTask({
            where: { id: data.id },
            data //TODO: Further read docs to see if connect is needed
        });
    }

    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN) 
    @Delete(':id')
    async delteTask(@Param('id', ParseIntPipe) id: number): Promise<Task> {
        const ok = await this.tasksService.deleteTask({ id: Number(id) });
        if (!ok) {
            throw new NotFoundException();
        }
        return ok;
    }
}
