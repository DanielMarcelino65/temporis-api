import { Module } from '@nestjs/common';
import { MuseumsService } from './museums.service';
import { MuseumsController } from './museums.controller';
import { PrismaService } from 'src/prisma/prisma.service';

@Module({
  imports: [],
  providers: [MuseumsService, PrismaService],
  controllers: [MuseumsController],
})
export class MuseumsModule {}
