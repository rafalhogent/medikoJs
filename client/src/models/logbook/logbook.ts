import { TrackedEntity } from '../common/tracked-entity';

export class Logbook extends TrackedEntity {
  constructor() {
    super();
  }
  name?: string;
  field1?: string;
  unit1?: string;
  precision1?: number = undefined;
  field2?: string;
  unit2?: string;
  precision2?: number = undefined;
  field3?: string;
  unit3?: string;
  precision3?: number = undefined;
  field4?: string;
  unit4?: string;
  precision4?: number = undefined;
  icon?: string;
  isChoosen: boolean = true;
  logs: Log[] = [];

  update = (updatedLogbook: Logbook) => {
    this.name = updatedLogbook.name;
    this.field1 = updatedLogbook.field1;
    this.field2 = updatedLogbook.field2;
    this.field3 = updatedLogbook.field3;
    this.field4 = updatedLogbook.field4;
    this.unit1 = updatedLogbook.unit1;
    this.unit2 = updatedLogbook.unit2;
    this.unit3 = updatedLogbook.unit3;
    this.unit4 = updatedLogbook.unit4;
    this.precision1 = updatedLogbook.precision1;
    this.precision2 = updatedLogbook.precision2;
    this.precision3 = updatedLogbook.precision3;
    this.precision4 = updatedLogbook.precision4;
    this.updatedAt = new Date();
  };

  makeDeleted = () => {
    delete this.name;
    delete this.icon;
    delete this.field1;
    delete this.field2;
    delete this.field3;
    delete this.field4;
    delete this.unit1;
    delete this.unit2;
    delete this.unit3;
    delete this.unit4;
    delete this.precision1;
    delete this.precision2;
    delete this.precision3;
    delete this.precision4;
    delete this.updatedAt;
    delete this.createdAt;
    this.isChoosen = false;
    this.logs = [];
    this.deletedAt = new Date();
    this.isDeleted = true;

    console.log('thislb', this);
  };
}

export class Log extends TrackedEntity {
  constructor() {
    super();
  }
  moment: Date | null = new Date();
  value1?: number;
  value2?: number;
  value3?: number;
  value4?: number;
  comment?: string;

  update(newLog: Log): void {
    this.moment = newLog.moment;
    this.value1 = newLog.value1;
    this.value2 = newLog.value2;
    this.value3 = newLog.value3;
    this.value4 = newLog.value4;
    this.comment = newLog.comment;
    this.updatedAt = new Date();
  }

  makeDeleted() {
    this.moment = null;
    delete this.value1;
    delete this.value2;
    delete this.value3;
    delete this.value4;
    delete this.comment;
    delete this.createdAt;
    delete this.updatedAt;
    this.isDeleted = true;
    this.deletedAt = new Date();
  }
}
