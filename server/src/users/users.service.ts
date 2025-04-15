import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { User, Prisma } from '@prisma/client';
import * as bcrypt from 'bcryptjs';


export type IUser = Omit<User, 'password'>;
@Injectable()
export class UsersService {
    constructor(private prisma: PrismaService) { }

    async getUser(
        UserWhereUniqueInput: Prisma.UserWhereUniqueInput,
    ): Promise<IUser | null> {
        return this.prisma.user.findUnique({
            where: UserWhereUniqueInput,
            select: {
                id: true,
                email: true,
                name: true,
                role: true,
                refreshToken: true //TODO check if necessary
            }
        });
    }

    async getUsers(params: {
        skip?: number;
        take?: number;
        cursor?: Prisma.UserWhereUniqueInput;
        where?: Prisma.UserWhereInput;
        orderBy?: Prisma.UserOrderByWithRelationInput;
    }): Promise<User[]> {
        const { skip, take, cursor, where, orderBy } = params;
        const users = await this.prisma.user.findMany({
            skip,
            take,
            cursor,
            where,
            orderBy,
        });
        if (users){
            return users.filter((u) => delete u.password);
        }
    }

    async createUser(data: Prisma.UserCreateInput): Promise<IUser> {
        const hashedPassword = await bcrypt.hash(data.password, 15);
        data.password = hashedPassword;
        const newUser = await this.prisma.user.create({
            data
        })

        delete newUser.password;
        return newUser
    }

    async updateUser(params: {
        where: Prisma.UserWhereUniqueInput;
        data: Prisma.UserUpdateInput;
    }): Promise<IUser> {
        const { where, data } = params;
        const user = await this.prisma.user.update({
            data,
            where,
        });

        delete user.password
        return user
    }

    // TODO: fix Foreign key constraint violated: `Task_assignedToId_fkey (index)`
    //* User that add assigned to a task can't be deleted 
    async deleteUser(where: Prisma.UserWhereUniqueInput): Promise<User> {
        return this.prisma.user.delete({
            where,
        });
    }
}

