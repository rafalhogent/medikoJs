import { Expose } from 'class-transformer';

export class CreateSleepDto {
  @Expose()
  begin: string;
  @Expose()
  wakeUp: string;
  @Expose()
  note?: string;
}
