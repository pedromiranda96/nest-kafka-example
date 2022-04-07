import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { UsersService } from './users.service';

interface UserCreatedPayload {
  name: string;
  email: string;
}

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @EventPattern('users.user-created')
  async userCreated(@Payload('value') payload: UserCreatedPayload) {
    await this.usersService.sendWelcomeEmail(payload);
  }
}
