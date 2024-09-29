import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { LogbookService } from './logbook.service';
import { LogbookSyncDto } from './dto/logbook-sync.dto';

@Controller('logbook')
export class LogbookController {
  constructor(private readonly logbookService: LogbookService) {}

  @Get()
  findAll() {
    return this.logbookService.getDefaultLogbooks();
  }

  @Post()
  syncDefaultLogbooks(@Body() syncDto: LogbookSyncDto) {
    return 'This endpoint syncs logbooks'
  }

}
