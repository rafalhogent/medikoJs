import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
import { version } from '../package.json';
dotenv.configDotenv();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.enableCors();
  await app.listen(process.env.APP_PORT);
  console.log(
    `MedikoJs-server (v${version}) is listening at port ${process.env.APP_PORT}`,
  );
}
bootstrap();
