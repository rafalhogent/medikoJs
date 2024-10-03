import {
  Controller,
  Get,
  Body,
  UseGuards,
  Request,
  Patch,
} from '@nestjs/common';
import { LogbookService } from './logbook.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('logbook')
export class LogbookController {
  constructor(private readonly logbookService: LogbookService) {}

  @Get()
  findAll() {
    return this.logbookService.getDefaultLogbooks();
  }

  @UseGuards(AuthGuard)
  @Patch()
  syncDefaultLogbooks(@Body() syncDto: any, @Request() req) {
    return this.logbookService.syncLogbooksByUser(syncDto, req.user.sub);
  }
}
