import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

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
        const newUser = new this.userModel({
            username, 
            password, 
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

    private async findUser(username: string, password: string): Promise<User> {
        const user = await this.userModel.findOne({username: username}).exec();
        if (!user || !this.checkUserAuthenticity(user, password))
            throw new NotFoundException('Could not find user.');
        return user;
    }

    private checkUserAuthenticity(currentUser: User, password: string): boolean {
        // TODO: check salt of a user
        if (!currentUser.password || currentUser.password !== password)
            return false;
        return true;
    }
}
