import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  const fastify = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: true }),
  );

  const PORT = process.env.PORT;

  await fastify.listen(PORT, (error, address) => {
    if (error) {
      throw new Error(String(error));
    }
    console.info(`Server is Running, address: ${address}`);
  });
}
bootstrap();
