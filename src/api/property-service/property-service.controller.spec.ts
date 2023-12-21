import { Test, TestingModule } from '@nestjs/testing';

import { PropertyServiceController } from './property-service.controller';
import { PropertyServiceService } from './property-service.service';

describe('PropertyServiceController', () => {
  let controller: PropertyServiceController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PropertyServiceController],
      providers: [PropertyServiceService],
    }).compile();

    controller = module.get<PropertyServiceController>(
      PropertyServiceController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
