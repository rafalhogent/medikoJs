import { Module } from '@nestjs/common';
import { SleepService } from './sleep.service';
import { SleepController } from './sleep.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sleep } from './entities/sleep.entity';

@Module({
  imports:[TypeOrmModule.forFeature([Sleep])],
  controllers: [SleepController],
  providers: [SleepService]
})
export class SleepModule {}
