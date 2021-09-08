import { Request, Controller, Get, Post, Patch, Delete, HttpCode, Header, Headers, Query, Body, BadRequestException, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}
    
    @Get()
    @Header('content-type', 'application/json')
    async fetchUser(
        @Query('username') username: string,
        @Query('password') password: string
    ): Promise<any> {
        console.log('===> user/get/');
        console.log({ 'user': username });
        if (!username || !password)
            throw new BadRequestException('The payload do not respect the contract.');
        const currentUser = await this.userService.connect(username, password);
        return ({currentUser: currentUser})
    }
    
    @Post()
    @Header('content-type', 'application/json')
    async createUser(
        @Body('username') username: string,
        @Body('password') password: string
    ): Promise<any> {
        console.log('===> user/post/');
        console.log({ 'user': username, 'pass': password });
        if (!username || !password)
            throw new BadRequestException('The payload do not respect the contract.');
        const newlyUser = await this.userService.create(username, password);
        return ({user: newlyUser});
    }
        
    @Patch()
    @UseGuards(JwtAuthGuard)
    @HttpCode(201)
    @Header('content-type', 'application/json')
    async updateUser(
        @Request() req: any,
        @Body('desc') desc: string,
        @Body('image') image: string
    ): Promise<any> {
        console.log('===> user/patch/');
        console.log({ 'desc': desc, 'image': image });
        return await this.userService.update(req.user, desc, image);
    }

    @Delete()
    @UseGuards(JwtAuthGuard)
    @HttpCode(204)
    @Header('content-type', 'application/json')
    async deleteUser(
        @Request() req: any,
    ): Promise<any> {
        console.log('===> user/delete/');
        return await this.userService.delete(req.user);
    }
}
