export class CreateSleepDto {
  id?: number;
  begin!: string;
  wakeUp!: string;
  note?: string;
  interruptions?: CreateInterruptionDto[];
}

export class CreateInterruptionDto {
  date!: string;
  duration!: number;
  note?: string;
}
