import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MailModule } from './mail/mail.module';
import { MessagingModule } from './messaging/messaging.module';

@Module({
  imports: [ConfigModule.forRoot(), MailModule, MessagingModule],
})
export class AppModule {}
