import { LocalStorage } from 'quasar';
import { Log, Logbook } from 'src/models/logbook/logbook';
import { DEF_LOGBOOKS } from './local-keys';
import { DateTime } from 'luxon';

export class LogbookLocalService {
  static ensureDefaultLogbooks() {
    const logbooks: Logbook[] = [
      {
        ...new Logbook(),
        ...{
          id: '1',
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
          id: '2',
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
          id: '3',
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
          id: '4',
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
          id: '5',
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
          id: '6',
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

    const deflogbooks = LogbookLocalService.getDefaultLogbooks();

    if (!deflogbooks) {
      LocalStorage.setItem(DEF_LOGBOOKS, logbooks);
    }
  }

  static getDefaultLogbooks(): Logbook[] {
    const deflogbooks = LocalStorage.getItem(DEF_LOGBOOKS) as Logbook[];
    deflogbooks.forEach((lgb) => {
      lgb.logs.forEach((l) => {
        if (l.moment) {
          l.moment = DateTime.fromISO(l.moment.toString()).toJSDate();
        }
      });
    });
    return deflogbooks;
  }

  static saveDefaultLogbooks(logbooks: Logbook[]) {
    LocalStorage.setItem(DEF_LOGBOOKS, logbooks);
  }

  static upsertLog(lg: Log, logBookId: string) {
    const logBooks = LogbookLocalService.getDefaultLogbooks();
    const ourLogbook = logBooks.find((lb) => lb.id == logBookId);
    if (ourLogbook) {
      const existingLog = ourLogbook.logs.find((l) => l.id == lg.id);
      if (existingLog) {
        for (const key in existingLog) {
          if (Object.prototype.hasOwnProperty.call(existingLog, key)) {
            (existingLog as any)[key] = (lg as any)[key];
          }
        }
      } else {
        ourLogbook.logs.push(lg);
      }
      LogbookLocalService.saveDefaultLogbooks(logBooks);
    } else {
      throw new Error('Logbook not found');
    }
  }
}
