import { Request, Controller, Get, Post, Patch, Delete, HttpCode, Header, Headers, Query, Body, BadRequestException, UseGuards, Response } from '@nestjs/common';
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
        console.log('===> user/get/');
        console.log({ 'user': username });
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
        console.log('===> user/post/');
        console.log({ 'user': username, 'pass': password });
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
        @Body('desc') desc: string,
        @Body('image') image: string
    ): Promise<any> {
        console.log('===> user/patch/');
        console.log({ 'desc': desc, 'image': image });
        console.log({ 'User': req.user });
        const response = await this.userService.update(req.user, desc, image);
        return res.json({...response});
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Header('content-type', 'application/json')
    async deleteUser(
        @Request() req: any,
    ): Promise<any> {
        console.log('===> user/delete/');
        return this.userService.delete(req.user);
    }
}
