import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Logbook } from './entities/logbook.entity';
import { Repository } from 'typeorm';
import { Log } from './entities/log.entity';
import { LogbookSyncDto } from './dto/logbook-sync.dto';
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

  getLogbooksByUser(userId: number) {
    return this.logbooksRepo.find({
      where: { owner: { id: userId } },
      relations: { logs: true },
    });
  }

  async syncLogbooksByUser(syncDto: LogbookSyncDto, userId: number) {
    const clientLogbooks = plainToInstance(Logbook, syncDto.logbooks);

    const dbLogbooks = await this.logbooksRepo.find({
      relations: { logs: true },
      where: { owner: { id: userId } },
    });

    clientLogbooks.forEach((clb) => {
      const dblogbook = dbLogbooks.find((dblb) => dblb.name == clb.name);
      if (dblogbook) {
        clb.logs.forEach((cl) => {
          const dblog = dblogbook.logs.find((l) => l.id == cl.id);
          if (dblog) {
            if (dblog.isDeleted || cl.isDeleted) {
              dblog.makeDeleted();
            } else {
              if (dblog.updatedAt < cl.updatedAt) {
                dblog.update(cl);
              }
            }
          } else {
            dblogbook.logs.push(cl);
          }
        });
      } else {
        clb.owner = { id: userId } as User;
        dbLogbooks.push(clb);
      }
    });

    const savedLogbooks = await this.logbooksRepo.save(dbLogbooks);
    return savedLogbooks;
  }
}
