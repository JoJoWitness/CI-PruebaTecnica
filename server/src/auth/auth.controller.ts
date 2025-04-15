import { Controller, Request, Post, UseGuards, BadRequestException, UnauthorizedException, Body, Res, Req } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { RolesGuard } from './roles.guard';
import { Roles } from './roles.decorator';
import { Role } from '@prisma/client';
import { JwtAuthGuard } from './jwt-auth.guard';
import { IUser, UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { Request as ExpressRequest, Response } from 'express';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
        private usersService: UsersService
    ) { }

    @UseGuards(AuthGuard('local'))
    @Post('login')
    async login(
        @Request() req,
        @Res({ passthrough: true }) res: Response
    ) {
        const { accessToken, refreshToken } = await this.authService.login(req.user);
    
        res.cookie('refreshToken', refreshToken, {
            httpOnly: true,
            maxAge: 7 * 24 * 3600 * 1000, // 7 days
            secure: false, //!! Set to true in production
            path: '/auth/refresh-token',
        });
        console.log(accessToken)
        return {
            accessToken,
            message: "Login successfull"
        };
    }

    //! Solo admin puede crear usuarios
    @UseGuards(JwtAuthGuard, RolesGuard)
    @Roles(Role.ADMIN)
    @Post('register')
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

    @Post('refresh-token')
    async refreshToken(
        @Req() req: ExpressRequest,
        @Res({ passthrough: true }) res: Response
    ) {
        const refreshToken = req.cookies?.refreshToken;
        if (!refreshToken) {
            throw new BadRequestException();
        }

        const { accessToken, refreshToken: newRefreshToken } 
        = await this.authService.refreshToken(refreshToken);

        if (newRefreshToken) {
            res.cookie('refreshToken', newRefreshToken, {
                httpOnly: true,
                maxAge: 7 * 24 * 3600 * 1000,
                secure: false, //!! Set to true in production
                path: '/auth/refresh-token',
            });
        }
        
        return { accessToken };
    }

    @UseGuards(JwtAuthGuard)
    @Post('logout')
    async logout(
        @Request() req,
        @Res({ passthrough: true }) res: Response
    ) {
        await this.authService.logout(req.user);
        
        res.clearCookie('refreshToken');
        return 
    }
}
