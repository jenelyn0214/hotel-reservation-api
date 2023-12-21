import { Test, TestingModule } from '@nestjs/testing';

import { IboardtisementController } from './iboardtisement.controller';
import { IboardtisementService } from './iboardtisement.service';

describe('IboardtisementController', () => {
  let controller: IboardtisementController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [IboardtisementController],
      providers: [IboardtisementService],
    }).compile();

    controller = module.get<IboardtisementController>(IboardtisementController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
