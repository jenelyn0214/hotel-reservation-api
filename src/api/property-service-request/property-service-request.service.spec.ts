import { Test, TestingModule } from '@nestjs/testing';

import { PropertyServiceRequestService } from './property-service-request.service';

describe('PropertyServiceRequestService', () => {
  let service: PropertyServiceRequestService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PropertyServiceRequestService],
    }).compile();

    service = module.get<PropertyServiceRequestService>(
      PropertyServiceRequestService,
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
