import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
import { BusinessModule } from './business/business.module';

@Module({
  imports: [PrismaModule, BusinessModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
