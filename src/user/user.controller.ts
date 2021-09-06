import { Controller, Get, Query, Post, Patch, Headers, HttpCode } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) { }
    
    @Get()
    fetchUser(
        @Query('username') username: string,
        @Query('password') password: string): object {
        console.log('===> user/get/');
        console.log({ 'user': username });
        return this.userService.connect(username, password);
    }
    
    @Post()
    createUser(
        @Query('username') username: string,
        @Query('password') password: string): object {
        console.log('===> user/post/');
        console.log({ 'user': username, 'pass': password });
        return this.userService.create(username, password);
    }
        
    @Patch()
    @HttpCode(201)
    updateUser(
        @Headers('token') jwt: string,
        @Query() query: object): object {
        console.log('===> user/patch/');
        console.log({ 'token': jwt, 'Query': query });
        return this.userService.update(jwt, query);
    }
}
