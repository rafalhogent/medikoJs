import { Test, TestingModule } from '@nestjs/testing';
import { LogbookController } from './logbook.controller';
import { LogbookService } from './logbook.service';

describe('LogbookController', () => {
  let controller: LogbookController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LogbookController],
      providers: [LogbookService],
    }).compile();

    controller = module.get<LogbookController>(LogbookController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
