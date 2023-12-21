import { Test, TestingModule } from '@nestjs/testing';

import { PropertyServiceService } from './property-service.service';

describe('PropertyServiceService', () => {
  let service: PropertyServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyServiceService],
    }).compile();

    service = module.get<PropertyServiceService>(PropertyServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
