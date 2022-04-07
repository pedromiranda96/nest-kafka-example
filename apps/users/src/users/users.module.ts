import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import { DatabaseModule } from 'src/shared/database/database.module';
import { MessagingModule } from 'src/shared/messaging/messaging.module';

@Module({
  imports: [DatabaseModule, MessagingModule],
  providers: [UsersResolver, UsersService],
})
export class UsersModule {}
