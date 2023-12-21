import { Test, TestingModule } from '@nestjs/testing';

import { PropertyServiceRequestController } from './property-service-request.controller';
import { PropertyServiceRequestService } from './property-service-request.service';

describe('PropertyServiceRequestController', () => {
  let controller: PropertyServiceRequestController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyServiceRequestController],
      providers: [PropertyServiceRequestService],
    }).compile();

    controller = module.get<PropertyServiceRequestController>(
      PropertyServiceRequestController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
