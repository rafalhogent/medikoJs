import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from "dotenv";
import { SleepModule } from './modules/sleep/sleep.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/config/data-source';

dotenv.configDotenv()

@Module({
  imports: [ TypeOrmModule.forRoot(dataSourceOptions), SleepModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}