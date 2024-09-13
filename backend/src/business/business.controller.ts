import { Controller, Get, Param } from '@nestjs/common';
import { BusinessService } from './business.service';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Get()
  getAll() {
    return this.businessService.getAll();
  }

  @Get('/:businessSlug')
  getSingle(@Param('businessSlug') businessSlug: string) {
    return this.businessService.getSingle(businessSlug);
  }
}
