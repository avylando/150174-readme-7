import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  create() {
    return { id: 1000 }
  }

  getUser(id: number) {
    return ({ message: 'Hello API', id });
  }
}
