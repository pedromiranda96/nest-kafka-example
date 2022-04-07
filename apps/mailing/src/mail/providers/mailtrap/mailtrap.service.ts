import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { createTransport, Transporter } from 'nodemailer';
import { MailMessage } from '../mail.service';

@Injectable()
export class MailtrapService {
  private readonly transport: Transporter;

  constructor(configService: ConfigService) {
    this.transport = createTransport({
      host: 'smtp.mailtrap.io',
      port: 2525,
      auth: {
        user: configService.get('MAILTRAP_AUTH_USER'),
        pass: configService.get('MAILTRAP_AUTH_PASS'),
      },
    });
  }

  async sendMail(message: MailMessage) {
    await this.transport.sendMail(message);
  }
}
