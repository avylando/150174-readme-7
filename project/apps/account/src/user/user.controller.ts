import { Controller, Get, Param } from '@nestjs/common';

import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly appService: UserService) {}

  @Get('/:id')
  getUser(@Param('id') id: number) {
    return this.appService.getUser(id);
  }
}
