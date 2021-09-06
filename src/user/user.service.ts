import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
    connect(username, password): object {
        return {"user": username, "pass": password};
    }

    create(username, password): object {
        return {"user": username, "pass": password};
    }

    update(jwt, query): object {
        return {"JWTToken": jwt, "Query": query};
    }
}
