import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { randomBytes, createHmac } from 'crypto';

import { User } from './user.model';
@Injectable()
export class UserService {

    constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

    async connect(username: string, password: string): Promise<object> {
        let user;
        try {
            user = await this.findUser(username, password);
        } catch (error) {
            throw new InternalServerErrorException('Error occur in the server.');
        }
        return user;
    }

    async create(username: string, password: string): Promise<object> {
        await this.checkUserAlreadyExist(username);

        const salt = this.generateRandomString();
        const hashedPassword = this.encodeSha512String(password, salt);
        const newUser = new this.userModel({
            username,
            password: hashedPassword,
            salt: salt,
            desc: null,
            image: null
        });
        const res = await newUser.save();
        console.log({'res': res})
        return res;
    }

    async update(jwt: string, desc: string, image: string): Promise<object> {
        // TODO: Read JWT token
        const updatedUser = await this.findUser('test', 'test');
        if (desc)
            updatedUser.desc = desc;
        if (image)
            updatedUser.image = image;
        updatedUser.save();
        return {"JWTToken": jwt, "UpdatedUser": updatedUser};
    }

    async delete(jwt: string): Promise<any> {
        // TODO: Read JWT token
        const result = await this.userModel.deleteOne({username: 'test'}).exec();
        if (result.n === 0)
            throw new NotFoundException('Could not find user.');
        console.log(result);
        return result;
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
        return await this.userModel.find().exec();
    }
}
