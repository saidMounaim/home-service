import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BusinessService {
  constructor(private readonly prisma: PrismaService) {}

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
}
