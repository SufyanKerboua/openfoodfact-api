import { Request, Controller, Get, Post, Patch, Delete, HttpCode, Header, Query, Body, BadRequestException, UseGuards, Response } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    async fetchUser(
        @Response() res,
        @Query('username') username: string,
        @Query('password') password: string
    ): Promise<any> {
        if (!username || !password)
            throw new BadRequestException('The payload do not respect the contract.');
        const response = await this.userService.connect(username, password);
        return res.json({...response});
    }
    
    @Post()
    @Header('content-type', 'application/json')
    async createUser(
        @Response() res,
        @Body('username') username: string,
        @Body('password') password: string
    ): Promise<any> {
        if (!username || !password)
            throw new BadRequestException('The payload do not respect the contract.');
        const response = await this.userService.create(username, password);
        return res.json({...response});
    }
        
    @Patch()
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Header('content-type', 'application/json')
    async updateUser(
        @Response() res,
        @Request() req: any,
        @Body('user') user: any,
    ): Promise<any> {
        const response = await this.userService.update(req.user, user);
        return res.json({...response});
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Header('content-type', 'application/json')
    async deleteUser(
        @Request() req: any,
    ): Promise<any> {
        return this.userService.delete(req.user);
    }
}
