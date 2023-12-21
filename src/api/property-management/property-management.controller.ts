import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiResponse, ApiTags } from '@nestjs/swagger';

import { Public } from '@src/common/decorators';
import {
  PropertyManagementBPItemEnum,
  PropertyManagementItemEnum,
} from '@src/enums';

import {
  CreatePropertyManagementBPItemDTO,
  CreatePropertyManagementDTO,
  CreatePropertyManagementItemDTO,
  CreatePropertyManagementOfferItemDTO,
  PropertyManagementBPItemDTO,
  PropertyManagementDTO,
  PropertyManagementItemDTO,
  PropertyManagementOfferItemDTO,
  UpdatePropertyManagementBPItemDTO,
  UpdatePropertyManagementDTO,
  UpdatePropertyManagementItemDTO,
  UpdatePropertyManagementOfferItemDTO,
} from './property-management.dto';
import { PropertyManagementService } from './property-management.service';

@ApiTags('property management')
@Controller('property-management')
export class PropertyManagementController {
  constructor(
    private readonly propertyManagementService: PropertyManagementService,
  ) {}

  @Post()
  @ApiResponse({
    type: PropertyManagementDTO,
  })
  async create(
    @Body() createPropertyManagementDTO: CreatePropertyManagementDTO,
  ): Promise<PropertyManagementDTO> {
    return this.propertyManagementService.create(createPropertyManagementDTO);
  }

  @Public()
  @Get()
  @ApiResponse({
    type: PropertyManagementDTO,
  })
  async findAll(): Promise<PropertyManagementDTO> {
    return this.propertyManagementService.findAll();
  }

  @Patch()
  @ApiResponse({
    type: PropertyManagementDTO,
  })
  async update(
    @Body() updatePropertyManagementDTO: UpdatePropertyManagementDTO,
  ): Promise<PropertyManagementDTO> {
    return this.propertyManagementService.update(updatePropertyManagementDTO);
  }

  @Delete()
  @ApiResponse({
    type: Boolean,
  })
  async remove(): Promise<boolean> {
    return this.propertyManagementService.remove();
  }

  @Post('property-type')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async createPropertyTypeItem(
    @Body() createPropertyTypeItemDTO: CreatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.createPropertyManagementItem(
      PropertyManagementItemEnum.PROPERTY_TYPE,
      createPropertyTypeItemDTO,
    );
  }

  @Patch('property-type/:itemId')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async updatePropertyTypeItem(
    @Param('itemId') itemId: string,
    @Body() updatePropertyTypeItemDTO: UpdatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.updatePropertyManagementItem(
      PropertyManagementItemEnum.PROPERTY_TYPE,
      itemId,
      updatePropertyTypeItemDTO,
    );
  }

  @Delete('property-type/:itemId')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async deletePropertyTypeItem(
    @Param('itemId') itemId: string,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.deletePropertyManagementItem(
      PropertyManagementItemEnum.PROPERTY_TYPE,
      itemId,
    );
  }

  @Post('duration-stay')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async createDurationStayItem(
    @Body() createDurationStayItemDTO: CreatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.createPropertyManagementItem(
      PropertyManagementItemEnum.DURATION_STAY,
      createDurationStayItemDTO,
    );
  }

  @Patch('duration-stay/:itemId')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async updateDurationStayItem(
    @Param('itemId') itemId: string,
    @Body() updateDurationStayItemDTO: UpdatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.updatePropertyManagementItem(
      PropertyManagementItemEnum.DURATION_STAY,
      itemId,
      updateDurationStayItemDTO,
    );
  }

  @Delete('duration-stay/:itemId')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async deleteDurationStayItem(
    @Param('itemId') itemId: string,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.deletePropertyManagementItem(
      PropertyManagementItemEnum.DURATION_STAY,
      itemId,
    );
  }

  @Post('percentage-increase')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async createPercentageIncreaseItem(
    @Body() createPercentageIncreaseItemDTO: CreatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.createPropertyManagementItem(
      PropertyManagementItemEnum.PERCENTAGE_INCREASE,
      createPercentageIncreaseItemDTO,
    );
  }

  @Patch('percentage-increase/:itemId')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async updatePercentageIncreaseItem(
    @Param('itemId') itemId: string,
    @Body() updatePercentageIncreaseItemDTO: UpdatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.updatePropertyManagementItem(
      PropertyManagementItemEnum.PERCENTAGE_INCREASE,
      itemId,
      updatePercentageIncreaseItemDTO,
    );
  }

  @Delete('percentage-increase/:itemId')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async deletePercentageIncreaseItem(
    @Param('itemId') itemId: string,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.deletePropertyManagementItem(
      PropertyManagementItemEnum.PERCENTAGE_INCREASE,
      itemId,
    );
  }

  @Post('increase-type')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async createIncreaseTypeItem(
    @Body() createIncreaseTypeItemDTO: CreatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.createPropertyManagementItem(
      PropertyManagementItemEnum.INCREASE_TYPE,
      createIncreaseTypeItemDTO,
    );
  }

  @Patch('increase-type/:itemId')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async updateIncreaseTypeItem(
    @Param('itemId') itemId: string,
    @Body() updateIncreaseTypeItemDTO: UpdatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.updatePropertyManagementItem(
      PropertyManagementItemEnum.INCREASE_TYPE,
      itemId,
      updateIncreaseTypeItemDTO,
    );
  }

  @Delete('increase-type/:itemId')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async deleteIncreaseTypeItem(
    @Param('itemId') itemId: string,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.deletePropertyManagementItem(
      PropertyManagementItemEnum.INCREASE_TYPE,
      itemId,
    );
  }

  @Post('advances')
  @ApiResponse({
    type: [PropertyManagementBPItemDTO],
  })
  async createAdvancesItem(
    @Body() createAdvancesBPItemDTO: CreatePropertyManagementBPItemDTO,
  ): Promise<PropertyManagementBPItemDTO[]> {
    return this.propertyManagementService.createPropertyManagementBPItem(
      PropertyManagementBPItemEnum.ADVANCES,
      createAdvancesBPItemDTO,
    );
  }

  @Patch('advances/:itemId')
  @ApiResponse({
    type: [PropertyManagementBPItemDTO],
  })
  async updateAdvancesItem(
    @Param('itemId') itemId: string,
    @Body() updateAdvancesBPItemDTO: UpdatePropertyManagementBPItemDTO,
  ): Promise<PropertyManagementBPItemDTO[]> {
    return this.propertyManagementService.updatePropertyManagementBPItem(
      PropertyManagementBPItemEnum.ADVANCES,
      itemId,
      updateAdvancesBPItemDTO,
    );
  }

  @Delete('advances/:itemId')
  @ApiResponse({
    type: [PropertyManagementBPItemDTO],
  })
  async deleteAdvancesItem(
    @Param('itemId') itemId: string,
  ): Promise<PropertyManagementBPItemDTO[]> {
    return this.propertyManagementService.deletePropertyManagementBPItem(
      PropertyManagementBPItemEnum.ADVANCES,
      itemId,
    );
  }

  @Post('rental-advances')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async createRentalAdvancesItem(
    @Body() createRentalAdvancesBPItemDTO: CreatePropertyManagementBPItemDTO,
  ): Promise<PropertyManagementBPItemDTO[]> {
    return this.propertyManagementService.createPropertyManagementBPItem(
      PropertyManagementBPItemEnum.RENTAL_ADVANCES,
      createRentalAdvancesBPItemDTO,
    );
  }

  @Patch('rental-advances/:itemId')
  @ApiResponse({
    type: [PropertyManagementBPItemDTO],
  })
  async updateRentalAdvancesItem(
    @Param('itemId') itemId: string,
    @Body() updateRentalAdvancesBPItemDTO: UpdatePropertyManagementBPItemDTO,
  ): Promise<PropertyManagementBPItemDTO[]> {
    return this.propertyManagementService.updatePropertyManagementBPItem(
      PropertyManagementBPItemEnum.RENTAL_ADVANCES,
      itemId,
      updateRentalAdvancesBPItemDTO,
    );
  }

  @Delete('rental-advances/:itemId')
  @ApiResponse({
    type: [PropertyManagementBPItemDTO],
  })
  async deleteRentalAdvancesItem(
    @Param('itemId') itemId: string,
  ): Promise<PropertyManagementBPItemDTO[]> {
    return this.propertyManagementService.deletePropertyManagementBPItem(
      PropertyManagementBPItemEnum.RENTAL_ADVANCES,
      itemId,
    );
  }

  @Post('billing-types')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async createBillingTypesItem(
    @Body() createBillingTypesItemDTO: CreatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.createPropertyManagementItem(
      PropertyManagementItemEnum.BILLING_TYPES,
      createBillingTypesItemDTO,
    );
  }

  @Patch('billing-types/:itemId')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async updateBillingTypesItem(
    @Param('itemId') itemId: string,
    @Body() updateBillingTypesItemDTO: UpdatePropertyManagementItemDTO,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.updatePropertyManagementItem(
      PropertyManagementItemEnum.BILLING_TYPES,
      itemId,
      updateBillingTypesItemDTO,
    );
  }

  @Delete('billing-types/:itemId')
  @ApiResponse({
    type: [PropertyManagementItemDTO],
  })
  async deleteBillingTypesItem(
    @Param('itemId') itemId: string,
  ): Promise<PropertyManagementItemDTO[]> {
    return this.propertyManagementService.deletePropertyManagementItem(
      PropertyManagementItemEnum.BILLING_TYPES,
      itemId,
    );
  }

  @Post('offer-types')
  @ApiResponse({
    type: [PropertyManagementOfferItemDTO],
  })
  async createOfferTypesOfferItem(
    @Body()
    createOfferTypesOfferItemDTO: CreatePropertyManagementOfferItemDTO,
  ): Promise<PropertyManagementOfferItemDTO[]> {
    return this.propertyManagementService.createPropertyManagementOfferItem(
      createOfferTypesOfferItemDTO,
    );
  }

  @Patch('offer-types/:itemId')
  @ApiResponse({
    type: [PropertyManagementOfferItemDTO],
  })
  async updateOfferTypesOfferItem(
    @Param('itemId') itemId: string,
    @Body()
    updateOfferTypesOfferItemDTO: UpdatePropertyManagementOfferItemDTO,
  ): Promise<PropertyManagementOfferItemDTO[]> {
    return this.propertyManagementService.updatePropertyManagementOfferItem(
      itemId,
      updateOfferTypesOfferItemDTO,
    );
  }

  @Delete('offer-types/:itemId')
  @ApiResponse({
    type: [PropertyManagementOfferItemDTO],
  })
  async deleteOfferTypesOfferItem(
    @Param('itemId') itemId: string,
  ): Promise<PropertyManagementOfferItemDTO[]> {
    return this.propertyManagementService.deletePropertyManagementOfferItem(
      itemId,
    );
  }
}
