import { Transform, Type } from 'class-transformer';
import { DateTime } from 'luxon';
import 'reflect-metadata';
export class SleepDto {
  id!: number;

  @Transform(({ value }) => DateTime.fromISO(value), { toClassOnly: true })
  begin!: DateTime;

  @Transform((params) => DateTime.fromISO(params.value), { toClassOnly: true })
  wakeUp!: DateTime;

  note?: string;

  @Type(() => InterruptionDto)
  interruptions?: InterruptionDto[];
}

export class InterruptionDto {
  id!: number;

  @Transform((params) => DateTime.fromISO(params.value), { toClassOnly: true })
  date!: DateTime;

  duration!: number;

  note?: string;
}
