import { TrackedEntity } from '../common/tracked-entity';

export class Logbook extends TrackedEntity {
  constructor() {
    super();
  }
  name!: string;
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
  icon?: string
  isChoosen: boolean = false;
  logs: Log[] = [];
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
}
