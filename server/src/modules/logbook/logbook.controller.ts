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

  @UseGuards(AuthGuard)
  @Get()
  getLogbooksByUser(@Request() req) {
    return this.logbookService.getLogbooksByUser(req.user.sub);
  }

  @UseGuards(AuthGuard)
  @Patch()
  syncDefaultLogbooks(@Body() syncDto: any, @Request() req) {
    return this.logbookService.syncLogbooksByUser(syncDto, req.user.sub);
  }
}
