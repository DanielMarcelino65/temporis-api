import { Module } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { VisitsController } from './visits.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  providers: [VisitsService, PrismaService],
  controllers: [VisitsController],
})
export class VisitsModule {}
