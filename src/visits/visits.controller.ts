import { Controller, Post, Get, Param, Body } from '@nestjs/common';
import { VisitsService } from './visits.service';
import { CreateVisitDto } from 'src/museums/dto/create-visit.dto';

@Controller('visits')
export class VisitsController {
  constructor(private readonly service: VisitsService) {}

  @Post()
  create(@Body() dto: CreateVisitDto) {
    return this.service.create(dto);
  }

  @Get()
  list(@Param('userId') userId: string) {
    return this.service.findByUser(userId);
  }

  // @Get(':museumId')
  // exists(@Param('userId') userId: string, @Param('museumId') museumId: string) {
  //   return this.service.exists(userId, museumId);
  // }

  // @Delete(':museumId')
  // remove(@Param('userId') userId: string, @Param('museumId') museumId: string) {
  //   return this.service.remove(userId, museumId);
  // }
}
