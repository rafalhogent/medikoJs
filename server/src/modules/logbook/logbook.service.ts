import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logbook } from './entities/logbook.entity';
import { IsNull, Repository } from 'typeorm';
import { Log } from './entities/log.entity';

@Injectable()
export class LogbookService {
  constructor(
    @InjectRepository(Logbook)
    private readonly logbooksRepo: Repository<Logbook>,
    @InjectRepository(Log)
    private readonly logsRepo: Repository<Log>,
  ) {}

  getDefaultLogbooks() {
    return this.logbooksRepo.find({ where: { owner: IsNull() } });
  }

}
