import { Controller, Get, Post, Body, Param, Delete, Put, UnauthorizedException, BadRequestException, NotFoundException, InternalServerErrorException, ParseIntPipe } from '@nestjs/common';
import { IUser, UsersService } from './users.service';
import { Role } from '@prisma/client';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) { }

    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN) 
    @Get()
    async getUsers(): Promise<IUser[]> {
        const users = await this.usersService.getUsers({});
        if (!users) {
            throw new NotFoundException();
        }
        return users;
    }

    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN) 
    @Post()
    async signupUser(@Body() data: CreateUserDto): Promise<IUser> {
        const existingUser = await this.usersService.getUser({
            email: data.email
        });
        if (existingUser) {
            throw new BadRequestException();
        }
        if (data.role !== Role.USER) {
            throw new UnauthorizedException();
        }

        return await this.usersService.createUser(data);
    }

    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN) 
    @Put(':id')
    async updateUser(
        @Param('id', ParseIntPipe) id: number,
        @Body() data: UpdateUserDto
    ): Promise<IUser> {
        const user = await this.usersService.getUser({ id: Number(data.id) });
        if (!user) {
            throw new NotFoundException();
        }
        if (
            user.id !== id
            && data.role !== Role.ADMIN
            && data.role !== Role.SUPERVISOR
        ) {
            throw new UnauthorizedException();
        }

        return await this.usersService.updateUser({
            where: { id: Number(data.id) },
            data
        })
    }

    // TODO: Add Guard
    // TODO: role decorator on auth
    // @UseGuards(JwtAuthGuard)
    // @Roles(Role.ADMIN) 
    @Delete(':id')
    async delteUser(@Param('id', ParseIntPipe) id: number): Promise<IUser> {
        const ok = await this.usersService.deleteUser({ id: Number(id) });
        if (!ok) {
            throw new InternalServerErrorException();
        }
        return ok;
    }
}