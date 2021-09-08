import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/user/user.model';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService
    ) {}
    
    async generateToken(user: User): Promise<object> {
        const payload = { username: user.username, salt: user.salt };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}
