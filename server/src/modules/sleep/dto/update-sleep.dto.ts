import { PartialType } from '@nestjs/mapped-types';
import { CreateSleepDto } from './create-sleep.dto';

export class UpdateSleepDto extends PartialType(CreateSleepDto) {}
