import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/shared/database/prisma/prisma.service';
import { KafkaService } from 'src/shared/messaging/kafka/kafka.service';
import { CreateUserDTO } from './dto/create-user-dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly kafka: KafkaService,
  ) {}

  getUserById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  async createUser({ name, email }: CreateUserDTO) {
    const userWithSameEmail = await this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    if (userWithSameEmail) {
      throw new Error('E-mail address already registered');
    }

    const user = await this.prisma.user.create({
      data: {
        name,
        email,
      },
    });

    this.kafka.emit('users.user-created', {
      name,
      email,
    });

    return user;
  }
}
