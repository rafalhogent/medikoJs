import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as dotenv from 'dotenv';
import { SleepModule } from './modules/sleep/sleep.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/config/data-source';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { LogbookModule } from './modules/logbook/logbook.module';

dotenv.configDotenv();

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    SleepModule,
    AuthModule,
    UsersModule,
    LogbookModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
