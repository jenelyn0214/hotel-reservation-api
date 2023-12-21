import { Test, TestingModule } from '@nestjs/testing';

import { TermConditionController } from './term-condition.controller';
import { TermConditionService } from './term-condition.service';

describe('TermConditionController', () => {
  let controller: TermConditionController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TermConditionController],
      providers: [TermConditionService],
    }).compile();

    controller = module.get<TermConditionController>(TermConditionController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
