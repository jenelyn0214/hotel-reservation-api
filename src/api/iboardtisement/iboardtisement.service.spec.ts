import { Test, TestingModule } from '@nestjs/testing';

import { IboardtisementService } from './iboardtisement.service';

describe('IboardtisementService', () => {
  let service: IboardtisementService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [IboardtisementService],
    }).compile();

    service = module.get<IboardtisementService>(IboardtisementService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
