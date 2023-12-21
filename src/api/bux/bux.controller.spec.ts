import { Test, TestingModule } from '@nestjs/testing';

import { BUXController } from './bux.controller';
import { BUXService } from './bux.service';

describe('BUXController', () => {
  let controller: BUXController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BUXController],
      providers: [BUXService],
    }).compile();

    controller = module.get<BUXController>(BUXController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
