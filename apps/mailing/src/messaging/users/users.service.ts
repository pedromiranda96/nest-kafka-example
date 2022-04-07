import { Inject, Injectable } from '@nestjs/common';
import {
  MailService,
  MAIL_SERVICE_INJECTION_TOKEN,
} from 'src/mail/providers/mail.service';

interface SendWelcomeEmailParams {
  name: string;
  email: string;
}

@Injectable()
export class UsersService {
  constructor(
    @Inject(MAIL_SERVICE_INJECTION_TOKEN)
    private readonly mailService: MailService,
  ) {}

  async sendWelcomeEmail({ name, email }: SendWelcomeEmailParams) {
    await this.mailService.sendMail({
      from: {
        name: 'Mailing service',
        address: 'mailing@service.com',
      },
      to: {
        name,
        address: email,
      },
      subject: 'Welcome!',
      text: `Hi ${name}! Welcome to the app!`,
    });
  }
}
