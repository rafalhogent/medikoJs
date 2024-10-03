import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logbook, LOGBOOK_OWNER_COL } from './entities/logbook.entity';
import { And, IsNull, Or, Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { LogbookDto, LogbookSyncDto } from './dto/logbook-sync.dto';
import User from '../users/entities/user.entity';
import { plainToInstance } from 'class-transformer';

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

  async syncLogbooksByUser(syncDto: LogbookSyncDto, userId: number) {
    const clientLogbooks = plainToInstance(Logbook, syncDto.logbooks);

    const dbLogbooks = await this.logbooksRepo.manager
      .createQueryBuilder(Logbook, 'lb')
      .where(
        `lb.${LOGBOOK_OWNER_COL} is NULL OR lb.${LOGBOOK_OWNER_COL} = ${userId}`,
      )
      .getMany();

    const dbLogs = await this.logsRepo.find({
      where: { owner: { id: userId } },
    });

    clientLogbooks.forEach((clb) => {
      clb.logs.forEach((cl) => {
        const dblog = dbLogs.find((l) => l.id == cl.id);
        if (dblog) {
          if (dblog.isDeleted || cl.isDeleted) {
            dblog.makeDeleted();
            //TODO make cl deleted and return
          } else {
            if (dblog.updatedAt < cl.updatedAt) {
              dblog.update(cl);
            }
          }
        } else {
          const dbLogbook = dbLogbooks.find((lb) => lb.id == clb.id);
          dbLogs.push({
            ...cl,
            logbook: dbLogbook,
            owner: { id: userId } as User, // TODO 🤔 check if works in db
          } as Log);
        }
      });
    });

    const savedLogs = await this.logsRepo.save(dbLogs);
    const mapped = dbLogbooks.map((dbl) => {
      const lbdto = plainToInstance(LogbookDto, { ...dbl });
      lbdto.logs = dbLogs.filter((l) => l.logbookId == dbl.id);
      return lbdto;
    });

    return mapped;
  }
}
