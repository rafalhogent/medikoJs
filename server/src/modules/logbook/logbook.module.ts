import { Module } from '@nestjs/common';
import { LogbookService } from './logbook.service';
import { LogbookController } from './logbook.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Logbook } from './entities/logbook.entity';
import { Log } from './entities/log.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Logbook, Log])],
  controllers: [LogbookController],
  providers: [LogbookService],
})
export class LogbookModule {}
