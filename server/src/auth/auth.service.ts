import * as bcrypt from 'bcryptjs';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';
import { JwtService } from '@nestjs/jwt';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class AuthService {
    constructor(
        private prisma: PrismaService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<User | null> {
        const user: User = await this.prisma.user.findUnique({
            where: {
                email,
            },
        });
        if (!user) {
            return null;
        }
        // const isPasswordMatch = await bcrypt.compare(pass, user.password);
        // if (isPasswordMatch) {
        //     delete user.password;
        //     return user;
        // }
        return user;
    }

    async login(user: User) {
        const payload = { username: user.email, sub: user.id, role: user.role };
        const accessToken = this.jwtService.sign(payload);
        const refreshToken = uuidv4();
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 15);
       console.log(user)
        await this.prisma.user.update({
            where: user.id ? { id: user.id } : { email: user.email },
            data: { refreshToken: hashedRefreshToken },
          });

        return {
            accessToken, 
            refreshToken,
        };
    }

    async logout(user: User) {
        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: null },
        });
    }

    async refreshToken(refreshToken: string): Promise<{ accessToken: string; refreshToken?: string }> {
        const user = await this.prisma.user.findFirst({ where: { refreshToken } });
        console.log("ony")
        if (!user || !user.refreshToken) {
            throw new UnauthorizedException('Invalid refresh token');
        }

        const payload = { username: user.email, sub: user.id, role: user.role };
        const newAccessToken = this.jwtService.sign(payload);
        const newRefreshToken = uuidv4();
        const hashedNewRefreshToken = await bcrypt.hash(newRefreshToken, 15);

        await this.prisma.user.update({
            where: { id: user.id },
            data: { refreshToken: hashedNewRefreshToken },
        });

        return { accessToken: newAccessToken, refreshToken: newRefreshToken };
    }
}
