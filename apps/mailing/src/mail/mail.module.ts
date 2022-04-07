import { Module, Provider } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MAIL_SERVICE_INJECTION_TOKEN } from './providers/mail.service';
import { MailtrapService } from './providers/mailtrap/mailtrap.service';

const mailProvider: Provider<any> = {
  provide: MAIL_SERVICE_INJECTION_TOKEN,
  useClass: MailtrapService,
};

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [mailProvider],
  exports: [mailProvider],
})
export class MailModule {}
