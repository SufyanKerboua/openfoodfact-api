import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) {}
    
    async generateToken(user: User): Promise<any> {
        const payload = { username: user.username, id: user._id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
    
    async updateToken(userToken: any): Promise<object> {
        console.log({'token': userToken});
        const payload = { username: userToken.username, id: userToken.id };
        return {
            token: this.jwtService.sign(payload),
        };
    }
}
