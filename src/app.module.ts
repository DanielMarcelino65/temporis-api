import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { MuseumsModule } from './museums/museums.module';
import { VisitsModule } from './visits/visits.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [MuseumsModule, VisitsModule, UsersModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
