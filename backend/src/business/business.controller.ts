import {
  Body,
  Controller,
  FileTypeValidator,
  Get,
  Param,
  ParseFilePipe,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { BusinessService } from './business.service';
import { AddBusinessDto } from './dto/add-business.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Category } from '@prisma/client';
import { MakeAppointmentDto } from './dto/make-appointment.dto';

@Controller('business')
export class BusinessController {
  constructor(private businessService: BusinessService) {}

  @Get()
  getAll() {
    return this.businessService.getAll();
  }

  @Get('/category/:businessCategory')
  getBycategory(@Param('businessCategory') businessCategory: Category) {
    return this.businessService.getByCategory(businessCategory);
  }

  @Get('/:businessSlug')
  getSingle(@Param('businessSlug') businessSlug: string) {
    return this.businessService.getSingle(businessSlug);
  }

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  addBusiness(
    @Body() addBusinessDto: AddBusinessDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: '.(png|jpeg|jpg)' })],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.businessService.addBusiness(addBusinessDto, image);
  }

  @Post('/appointment/create')
  makeAppointment(@Body() makeAppointmentDto: MakeAppointmentDto) {
    return this.businessService.makeAppointment(makeAppointmentDto);
  }
}
