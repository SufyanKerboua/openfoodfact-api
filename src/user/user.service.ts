import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes, createHmac } from 'crypto';

import { AuthService } from 'src/auth/auth.service';
import { User } from './user.model';
@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<User>, 
        private authService: AuthService
        ) {}

    async connect(username: string, password: string): Promise<any> {
        let user;
        let token;
        try {
            user = await this.findUser(username, password);
            token = await this.authService.generateToken(user);
        } catch (error) {
            throw new InternalServerErrorException('Error occur in the server.');
        }
        return { 
            'token': token.token, 
            'user': {
                'username': user.username,
                'desc': user.desc
            } 
        };
    }

    async create(username: string, password: string): Promise<any> {
        await this.checkUserAlreadyExist(username);
        const salt = this.generateRandomString();
        const hashedPassword = this.encodeSha512String(password, salt);
        const newUser = new this.userModel({
            username,
            password: hashedPassword,
            salt: salt,
            desc: null,
            wanted_data: null
        });
        const res = await newUser.save();
        const token = await this.authService.generateToken(newUser);
        console.log({'res': res})
        return { 
            'token': token.token, 
            'user': {
                'username': newUser.username,
                'desc': newUser.desc
            } 
        };
    }

    async update(userToken: any, user: any): Promise<any> {
        const updatedUser = await this.userModel.findOne({username: userToken.username, _id: userToken.id}).exec();
        if (!updatedUser)
            throw new NotFoundException('Could not find user.');

        if (user.desc)
            updatedUser.desc = user.desc;
        if (user.wanted_data)
            updatedUser.wanted_data = user.wanted_data;
        updatedUser.save();
        const token = await this.authService.generateToken(updatedUser);
        return { 
            'token': token.token, 
            'user': {
                'username': updatedUser.username,
                'desc': updatedUser.desc,
                'wanted_data': updatedUser.wanted_data
            } 
        };
    }

    async delete(user: User): Promise<string> {
        const result = await this.userModel.deleteOne({username: user.username}).exec();
        if (result.n === 0)
            throw new NotFoundException('Could not find user.');
        return 'The resource has been deleted';
    }

    //
    
    private generateRandomString(): string {
        return randomBytes(Math.ceil(8)).toString('hex').slice(0, 16);
    }

    private encodeSha512String(password: string, salt: string): string {
        return createHmac('sha512', salt).update(password).digest('hex');
    }

    private async findUser(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({username: username}).exec();
        if (!user || !this.checkUserAuthenticity(user, password))
            throw new NotFoundException('Could not find user.');
        return user;
    }

    private checkUserAuthenticity(currentUser: User, password: string): boolean {
        if (!currentUser.password || 
            !currentUser.salt || 
            currentUser.password !== this.encodeSha512String(password, currentUser.salt))
            return false;
        return true;
    }

    private async checkUserAlreadyExist(username: string): Promise<void> {
        const users = await this.retrieveAllUsers();

        users.map(user => {
            if (user.username === username)
                throw new ConflictException('The resource already exists.');
        });
    }

    private async retrieveAllUsers(): Promise<any> {
        return this.userModel.find().exec();
    }
}
