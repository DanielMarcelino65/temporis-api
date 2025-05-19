import { Controller, Post, Get, Delete, Param, Body } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from 'src/museums/dto/create-visit.dto';

@Controller('users/:userId/visits')
export class VisitsController {
  constructor(private readonly service: VisitsService) {}

  @Post()
  create(@Param('userId') userId: string, @Body() dto: CreateVisitDto) {
    return this.service.create(userId, dto);
  }

  @Get()
  list(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  @Get(':museumId')
  exists(@Param('userId') userId: string, @Param('museumId') museumId: string) {
    return this.service.exists(userId, museumId);
  }

  @Delete(':museumId')
  remove(@Param('userId') userId: string, @Param('museumId') museumId: string) {
    return this.service.remove(userId, museumId);
  }
}
