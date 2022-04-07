export const MAIL_SERVICE_INJECTION_TOKEN = 'MAIL_SERVICE';

export interface MailAddress {
  name: string;
  address: string;
}

export interface MailMessage {
  from: MailAddress;
  to: MailAddress;
  subject: string;
  text: string;
}

export interface MailService {
  sendMail: (message: MailMessage) => Promise<void>;
}
