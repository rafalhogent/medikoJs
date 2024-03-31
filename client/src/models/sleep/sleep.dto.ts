export class SleepDto {
  id!: number;
  begin!: string;
  wakeUp!: string;
  note!: string;
  interruptions?: InterruptionDto[];
}

export class InterruptionDto {
  id!: number;
  date!: string;
  duration!: number;
  note?: string;
}
