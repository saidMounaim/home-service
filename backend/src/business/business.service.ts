import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { AddBusinessDto } from './dto/add-business.dto';
import slugify from 'slugify';
import { CloudinaryService } from 'src/cloudinary/cloudinary.service';
import { Category } from '@prisma/client';
import { MakeAppointmentDto } from './dto/make-appointment.dto';

@Injectable()
export class BusinessService {
  constructor(
    private readonly prisma: PrismaService,
    private cloudinaryService: CloudinaryService,
  ) {}

  async getAll() {
    try {
      const business = await this.prisma.business.findMany({
        orderBy: { createdAt: 'desc' },
      });

      return business;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getByCategory(businessCategory: Category) {
    try {
      const business = await this.prisma.business.findMany({
        where: {
          category: businessCategory,
        },
        orderBy: { createdAt: 'desc' },
      });

      return business;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async getSingle(businessSlug: string) {
    try {
      const business = await this.prisma.business.findUnique({
        where: { slug: businessSlug },
      });
      if (!business) {
        throw new BadRequestException('Business not found');
      }
      return business;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async addBusiness(
    addBusinessDto: AddBusinessDto,
    image: Express.Multer.File,
  ) {
    try {
      let slug = slugify(addBusinessDto.title, {
        lower: true,
        strict: true,
      });

      let slugExists = await this.prisma.business.findUnique({
        where: { slug },
      });
      let count = 1;

      while (slugExists) {
        slug = `${slug}-${count}`;
        count++;
        slugExists = await this.prisma.business.findUnique({ where: { slug } });
      }

      let uploadImgUrl: string;

      try {
        const uploadResult = await this.cloudinaryService.uploadImage(image);
        uploadImgUrl = uploadResult.url;
      } catch (error) {
        throw new BadRequestException(
          `Error uploading image: ${error.message}`,
        );
      }

      const newBusiness = { ...addBusinessDto, slug, image: uploadImgUrl };
      await this.prisma.business.create({ data: newBusiness });

      return newBusiness;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async makeAppointment(makeAppointmentDto: MakeAppointmentDto) {
    const { date, timeSlot, businessId } = makeAppointmentDto;
    try {
      const appointment = await this.prisma.appointment.findFirst({
        where: {
          businessId,
          date: new Date(date),
          timeSlot,
        },
      });

      if (appointment) {
        throw new BadRequestException('Appointment already booked');
      }

      const newAppointment = { date: new Date(date), timeSlot, businessId };

      await this.prisma.appointment.create({ data: newAppointment });

      return newAppointment;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
