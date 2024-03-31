import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv';
dotenv.configDotenv();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {cors: true});
  app.enableCors();
  await app.listen(process.env.APP_PORT);
  console.log(`Application is listening at port ${process.env.APP_PORT}`);
  
}
bootstrap();
