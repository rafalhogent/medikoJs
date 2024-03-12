import { Test, TestingModule } from '@nestjs/testing';
import { SleepController } from './sleep.controller';
import { SleepService } from './sleep.service';

describe('SleepController', () => {
  let controller: SleepController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SleepController],
      providers: [SleepService],
    }).compile();

    controller = module.get<SleepController>(SleepController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
