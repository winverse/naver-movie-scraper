import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { ping } from '@common/plugins';
import { VersioningType } from '@nestjs/common';

async function bootstrap() {
  const fastify = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter({ logger: false }),
  );

  fastify.register(ping);

  fastify.setGlobalPrefix('/api');
  fastify.enableVersioning({
    type: VersioningType.URI,
  });

  const PORT = process.env.PORT;

  await fastify.listen(PORT, (error, address) => {
    if (error) {
      throw new Error(String(error));
    }
    console.info(`Server is Running, address: ${address}`);
  });
}
bootstrap();
