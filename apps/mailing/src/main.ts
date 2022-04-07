import { NestFactory } from '@nestjs/core';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        clientId: 'mailing',
        brokers: [process.env.KAFKA_BROKERS],
      },
    },
  });

  app.startAllMicroservices().then(() => {
    console.log('[MAILING] Service running');
  });

  await app.listen(3334);
}
bootstrap();
