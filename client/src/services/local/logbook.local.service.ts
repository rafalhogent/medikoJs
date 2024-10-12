import { LocalStorage } from 'quasar';
import { Log, Logbook } from 'src/models/logbook/logbook';
import { DEF_LOGBOOKS } from './local-keys';
import { DateTime } from 'luxon';
import { plainToInstance } from 'class-transformer';
import { v4 as uuidv4 } from 'uuid';

export class LogbookLocalService {
  static ensureDefaultLogbooks() {
    const logbooks: Logbook[] = [
      {
        ...new Logbook(),
        ...{
          id: uuidv4(),
          name: 'weight',
          field1: 'weight',
          unit1: 'kg',
          precision1: 1,
          isChoosen: true,
          icon: 'mdi-scale',
        },
      },
      {
        ...new Logbook(),
        ...{
          id: uuidv4(),
          name: 'blood pressure',
          field1: 'systolic',
          precision1: 0,
          field2: 'diastolic',
          precision2: 0,
          field3: 'pulse',
          precision3: 0,
          icon: 'mdi-stethoscope',
          isChoosen: true,
        },
      },
      {
        ...new Logbook(),
        ...{
          id: uuidv4(),
          name: 'temperature',
          field1: 'temperature',
          unit1: '℃',
          precision1: 1,
          icon: 'mdi-thermometer',
          isChoosen: true,
        },
      },
      {
        ...new Logbook(),
        ...{
          id: uuidv4(),
          name: 'water',
          field1: 'water',
          unit1: 'ml',
          precision1: 0,
          isChoosen: true,
          icon: 'mdi-water-outline',
        },
      },

      {
        ...new Logbook(),
        ...{
          id: uuidv4(),
          name: 'glucose',
          field1: 'glucose',
          unit1: 'mmol/L',
          precision1: 1,
          isChoosen: true,
          icon: 'mdi-diabetes',
        },
      },

      {
        ...new Logbook(),
        ...{
          id: uuidv4(),
          name: 'thyroid',
          field1: 'TSH',
          precision1: 1,
          unit1: 'mU/l',
          field2: 'FT4',
          unit2: 'pmol/l',
          precision2: 1,
          field3: 'FT3',
          unit3: 'pmol/l',
          precision3: 1,
          isChoosen: true,
          icon: 'mdi-account-outline',
        },
      },
    ];

    const deflogbooks = LogbookLocalService.getLocalLogbooks();

    if (!deflogbooks?.length) {
      LocalStorage.setItem(DEF_LOGBOOKS, logbooks);
    }
  }

  static getLocalLogbooks(): Logbook[] {
    const localLogbooks = plainToInstance(
      Logbook,
      LocalStorage.getItem(DEF_LOGBOOKS) as any[],
    );
    if (localLogbooks) {
      const deflogbooks = localLogbooks.filter((lb) => !lb.isDeleted);
      deflogbooks.forEach((lgb) => {
        lgb.logs = lgb.logs
          .filter((l) => !l.isDeleted)
          .map((l) => plainToInstance(Log, l));
        lgb.logs.forEach((l) => {
          if (l.moment) {
            l.moment = DateTime.fromISO(l.moment.toString()).toJSDate();
          }
        });
      });
      return deflogbooks;
    }
    return [];
  }

  static getAllLogbooksData() {
    return plainToInstance(
      Logbook,
      LocalStorage.getItem(DEF_LOGBOOKS) as any[],
    );
  }

  static saveLogbooksData(logbooks: Logbook[]) {
    LocalStorage.setItem(DEF_LOGBOOKS, logbooks);
  }

  static upsertLog(lg: Log, logBookId: string) {
    const logBooks = LogbookLocalService.getLocalLogbooks();
    const ourLogbook = logBooks.find((lb) => lb.id == logBookId);
    if (ourLogbook) {
      const existingLog = ourLogbook.logs.find((l) => l.id == lg.id);
      if (existingLog) {
        existingLog.update(lg);
      } else {
        ourLogbook.logs.push(lg);
      }
      LogbookLocalService.saveLogbooksData(logBooks);
    } else {
      throw new Error('Logbook not found');
    }
  }

  static upsertLogbookDefinition(model: Logbook) {
    const logbooks = plainToInstance(
      Logbook,
      LogbookLocalService.getLocalLogbooks(),
    );

    const nameExists = logbooks.some(
      (l) =>
        l.id != model.id &&
        l.name &&
        model.name &&
        l.name.toLowerCase() == model.name.toLowerCase(),
    );
    if (nameExists) {
      throw new Error('Logbook with the same name already exists');
    }
    if (!model.id) {
      const newLogbook = new Logbook();
      newLogbook.update(model);
      logbooks.push(newLogbook);
    } else {
      const ourLogbook = logbooks.find((lb) => lb.id === model.id);
      if (ourLogbook) {
        ourLogbook.update(model);
      }
    }
    LogbookLocalService.saveLogbooksData(logbooks);
  }

  static removeLogbook(logbookId: string) {
    const logbooks = LogbookLocalService.getLocalLogbooks();
    const ourLogbook = logbooks.find((lb) => lb.id == logbookId);
    if (ourLogbook) {
      ourLogbook.makeDeleted();
      LogbookLocalService.saveLogbooksData(logbooks);
    }
  }

  static removeLog(id: string, logBookId: string) {
    const logBooks = LogbookLocalService.getLocalLogbooks();
    const ourLogbook = logBooks.find((lb) => lb.id == logBookId);
    if (ourLogbook) {
      const existingLog = ourLogbook.logs.find((l) => l.id == id);
      if (existingLog) {
        existingLog.makeDeleted();
        LogbookLocalService.saveLogbooksData(logBooks);
      }
    } else {
      throw new Error('Logbook not found');
    }
  }

  static clearLocalLogbooksData() {
    LocalStorage.removeItem(DEF_LOGBOOKS);
  }
}
